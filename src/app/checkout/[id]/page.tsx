/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/checkout/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { getEventById, createTransaction } from "@/lib/api/concerts"; 
import Header from "@/components/checkout/header";
import Breadcrumb from "@/components/checkout/breadcrumb";
import CustomerInfoForm from "@/components/checkout/customerInfoForm";
import EventSummary from "@/components/checkout/eventSummary";
import TicketSelection from "@/components/checkout/ticketSelection";
import PaymentMethod from "@/components/checkout/paymentMethod";
import OrderSummary from "@/components/checkout/orderSummary";
import CheckoutButton from "@/components/checkout/checkoutButton";
import { LoaderCircle } from "lucide-react";

interface EventData {
    id: number;
    nama_event: string;
    deskripsi_event: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    lokasi: string;
    harga_tiket: number;
    poster_event_url: string;
    venue: {
        nama_venue: string;
        alamat: string;
    };
}

function generateTransactionCode(prefix = 'TRX', randomLength = 4): string {
  const timestamp = Date.now().toString();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < randomLength; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}-${timestamp}-${randomPart}`;
}

export default function CheckoutPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState("bank");
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", whatsappNumber: "" });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const formatRupiah = (value: number) =>
        value.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });

    useEffect(() => {
        if (!id) return;
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const foundEvent = await getEventById(id);
                if (!foundEvent) {
                    alert("Concert not found!");
                    router.push("/concerts");
                } else {
                    setEvent(foundEvent);
                }
            } catch (error) {
                console.error("Failed to fetch event:", error);
                alert("Failed to load concert details.");
                router.push("/concerts");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, router]);

    if (loading || !event) {
        return (
            <div className="flex h-screen items-center justify-center">
                <LoaderCircle className="h-10 w-10 animate-spin text-[#ec1b21]" />
            </div>
        );
    }
    
    const ticketPrice = event.harga_tiket; 
    const subtotal = ticketPrice * ticketQuantity;
    const serviceFee = 0 * ticketQuantity;
    const total = subtotal + serviceFee;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > 10) return;
        setTicketQuantity(newQuantity);
    };

    const handleFileChange = (file: File | null) => {
        if (!file) {
            setPaymentProof(null);
            return;
        }
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            alert("Ukuran file bukti bayar tidak boleh melebihi 2MB. Silakan pilih file lain yang lebih kecil.");
            setPaymentProof(null);
            return;
        }
        setPaymentProof(file);
    };

    const handleCheckout = async () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.whatsappNumber) {
            alert("Harap lengkapi semua informasi customer.");
            return;
        }
        if ((selectedPayment === "bank" || selectedPayment === "qr") && !paymentProof) {
            alert("Harap unggah bukti pembayaran.");
            return;
        }

        setIsPlacingOrder(true);

        const paymentMethodMap: { [key: string]: number } = { bank: 2, qr: 1 };

        try {
            const transactionCode = generateTransactionCode();
            console.log(`Kode Transaksi Dibuat: ${transactionCode}`);
            const payload = {
                event_id: id,
                nama_pembeli: customerInfo.name,
                nomor_pembeli: customerInfo.whatsappNumber,
                email_pembeli: customerInfo.email,
                jumlah_tiket: ticketQuantity,
                total_harga: total,
                payment_status: "pending",
                payment_method_id: paymentMethodMap[selectedPayment],
                bukti_bayar: paymentProof,
                status_transaksi: "booked",
                kode_transaksi: transactionCode,
            };

            const result = await createTransaction(payload);
            console.log("Transaksi berhasil dibuat:", result);

            // Tombol tetap disabled karena isPlacingOrder masih 'true'
            Swal.fire({
                title: 'Pemesanan Berhasil!',
                icon: 'success',
                html: `
                    <div style="text-align: left; padding: 0 1em;">
                        <p>Terima kasih telah melakukan pemesanan. Berikut adalah detail transaksi Anda:</p>
                        <hr style="margin: 1em 0;" />
                        <p><strong>Kode Transaksi:</strong><br>
                           <span style="font-size: 1.2em; font-weight: bold; color: #ec1b21; user-select: text;">${transactionCode}</span>
                        </p>
                        <p><strong>Nama:</strong> ${customerInfo.name}</p>
                        <p><strong>Email:</strong> ${customerInfo.email}</p>
                        <p><strong>Jumlah Tiket:</strong> ${ticketQuantity} tiket</p>
                        <p><strong>Total Pembayaran:</strong> ${formatRupiah(total)}</p>
                        <hr style="margin: 1em 0;" />
                        <p style="font-size: 0.9em;">Detail transaksi telah kami kirimkan ke email Anda.</p>
                        <p style="font-size: 0.9em;">Mohon tunggu sebentar, tiket QR akan segera kami kirimkan.</p>
                    </div>
                `,
                confirmButtonText: 'OK',
                allowOutsideClick: false, 
            }).then((result) => {
                // Setelah pop-up ditutup...
                setIsPlacingOrder(false); // ...baru set loading menjadi false
                if (result.isConfirmed) {
                    router.push(`/concerts`);
                }
            });

        } catch (error: any) {
            console.error("Gagal melakukan checkout:", error);
            Swal.fire({
                title: 'Oops... Terjadi Kesalahan',
                text: error.message || 'Gagal memproses pesanan Anda.',
                icon: 'error',
                confirmButtonText: 'Coba Lagi'
            });
            // Pastikan loading berhenti jika ada error
            setIsPlacingOrder(false);
        }
        // HAPUS BLOK 'FINALLY' DARI SINI
    };

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <main className="container mx-auto my-8 max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* <Breadcrumb concertName={event.nama_event} /> */}

                <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                    <div className="lg:w-2/3">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">
                            Complete your order
                        </h1>

                        <CustomerInfoForm
                            customerInfo={customerInfo}
                            setCustomerInfo={setCustomerInfo}
                        />
                        
                        <EventSummary event={event} />

                        <TicketSelection
                            ticketPrice={ticketPrice}
                            ticketQuantity={ticketQuantity}
                            formatRupiah={formatRupiah}
                            handleQuantityChange={handleQuantityChange}
                        />

                        <PaymentMethod
                            selectedPayment={selectedPayment}
                            setSelectedPayment={setSelectedPayment}
                            paymentProof={paymentProof}
                            handleFileChange={handleFileChange}
                            total={total}
                            formatRupiah={formatRupiah}
                        />
                        
                        <CheckoutButton
                            total={total}
                            formatRupiah={formatRupiah}
                            handleCheckout={handleCheckout}
                            isPlacingOrder={isPlacingOrder}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <OrderSummary
                            ticketQuantity={ticketQuantity}
                            subtotal={subtotal}
                            serviceFee={serviceFee}
                            total={total}
                            formatRupiah={formatRupiah}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}