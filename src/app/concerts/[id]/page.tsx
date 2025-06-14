// File: app/concerts/[id]/page.tsx

"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import Image from 'next/image';

// Impor ikon 'Users' untuk kapasitas dan ikon lainnya
import {
    Calendar,
    MapPin,
    ArrowLeft,
    LoaderCircle,
    Clock,
    Users, // <-- Ikon untuk kapasitas
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventById, getFullImageUrl, formatPrice, formatDate, calculateDuration } from "@/lib/api/concerts";
// Impor tipe data terpusat dari lib/types.ts
import { EventType } from "@/lib/types"; 

export default function ConcertDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Gunakan EventType pada state
    const [event, setEvent] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);
                const data: EventType | null = await getEventById(id);
                if (!data) {
                    setError(new Error("Event not found"));
                } else {
                    setEvent(data);
                }
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoaderCircle className="h-12 w-12 animate-spin text-[#ec1b21]" />
            </div>
        );
    }

    if (error || !event) {
        return notFound();
    }

    // Render halaman jika data berhasil didapatkan
    return (
        <div className="bg-white pt-20 min-h-screen">
            <main className="container mx-auto mt-6 mb-20 max-w-4xl px-4">
                {/* Tombol Kembali */}
                <div className="mb-4">
                    <Button
                        variant="outline"
                        className="border-[#ec1b21] bg-white text-[#ec1b21] hover:bg-[#ec1b21] hover:text-white"
                        onClick={() => router.push("/concerts")}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Kembali ke Semua Konser
                    </Button>
                </div>

                {/* Banner Gambar */}
                <div className="relative mb-6 overflow-hidden rounded-xl shadow-md">
                    <Image
                        src={getFullImageUrl(event.poster_event_url)}
                        alt={event.nama_event}
                        width={1920}
                        height={1080}
                        className="h-auto w-full max-h-96 rounded-xl object-cover"
                        priority
                    />
                </div>

                {/* Judul */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {event.nama_event}
                    </h1>
                </div>

                {/* Info Lokasi, Tanggal, dan Kapasitas */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-[#ec1b21] mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-800">{event.venue?.nama_venue || event.lokasi}</p>
                            <p className="text-sm text-gray-500">{event.venue?.alamat}</p>
                            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                <Users className="h-4 w-4" />
                                <span>Kapasitas: {event.kapasitas.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-[#ec1b21] mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-800">{formatDate(event.tanggal_mulai)}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>Durasi: {calculateDuration(event.tanggal_mulai, event.tanggal_selesai)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Tombol Harga & Beli Tiket */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sticky top-20 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border">
                    <div className="text-lg font-bold text-gray-800">
                        Harga mulai dari <span className="text-[#ec1b21]">{formatPrice(event.harga_tiket)}</span>
                    </div>
                    <Link href={`/checkout/${event.id}`} passHref className="sm:ml-auto">
                        <Button size="lg" className="w-full sm:w-auto bg-[#ec1b21] text-white hover:bg-[#c5161b]">
                            Beli Tiket
                        </Button>
                    </Link>
                </div>

                {/* Share buttons */}
                <div className="mb-8">
                    <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-700 uppercase">
                        Share this event
                    </h3>
                    <div className="flex items-center space-x-2">
                        {[
                            { icon: <Facebook className="h-5 w-5 text-white" />, name: "Facebook", bg: "bg-[#1877F2]" },
                            { icon: <Twitter className="h-5 w-5 text-white" />, name: "Twitter", bg: "bg-[#1DA1F2]" },
                            { icon: <MessageCircle className="h-5 w-5 text-white" />, name: "WhatsApp", bg: "bg-[#25D366]" },
                            { icon: <Linkedin className="h-5 w-5 text-white" />, name: "LinkedIn", bg: "bg-[#0077B5]" },
                            { icon: <Mail className="h-5 w-5 text-white" />, name: "Email", bg: "bg-[#EA4335]" },
                        ].map((social) => (
                            <Button
                                key={social.name}
                                variant="ghost"
                                size="icon"
                                className={`h-10 w-10 rounded-full ${social.bg} hover:opacity-90`}
                                aria-label={`Share on ${social.name}`}
                            >
                                {social.icon}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Tentang Konser */}
                <section className="mb-10">
                    <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900">
                        About this concert
                    </h2>
                    <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                        {event.deskripsi_event}
                    </p>
                </section>

                {/* Benefits section */}
                <section className="mb-10 rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        When you book on TicketApp
                    </h3>
                    <ul className="space-y-3">
                        {[
                            "You'll receive e-Ticket instantly",
                            "Secure payment with multiple options",
                            "Customer support available 24/7",
                            "Mobile ticket accepted",
                        ].map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="mt-0.5 flex-shrink-0">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ec1b21]">
                                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="ml-3 text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Rules and policy */}
                <section className="mb-10">
                    <h3 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900">
                        Rules and policy
                    </h3>
                    <div className="prose prose-sm text-gray-700">
                        <p className="font-medium">GENERAL RULES:</p>
                        <ol className="list-decimal space-y-2 pl-5">
                            <li>
                                Organizers have the right to inspect bags, clothing, and/or
                                other belongings at the entrance.
                            </li>
                            <li>
                                No professional cameras or recording devices allowed without permission.
                            </li>
                            <li>No outside food or beverages permitted.</li>
                            <li>No smoking in the venue.</li>
                        </ol>
                    </div>
                </section>
                
            </main>
        </div>
    );
}