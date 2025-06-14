// File: lib/api.ts

const API_URL = "http://127.0.0.1:8000/api/events/";
const BASE_URL = "http://127.0.0.1:8000";

/**
 * Mengambil semua event dari API.
 * @returns {Promise<any[]>} Array dari objek event.
 */

interface TransactionPayload {
  event_id: string;
  nama_pembeli: string;
  nomor_pembeli: string;
  email_pembeli: string;
  jumlah_tiket: number;
  total_harga: number;
  payment_status: string;
  payment_method_id: number;
  bukti_bayar: File | null;
  status_transaksi: string;
  kode_transaksi: string;
}
export const getAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Gagal mengambil semua data event:", error);
    return [];
  }
};

/**
 * Mengambil satu event berdasarkan ID dari API.
 * @param {string} id - ID dari event.
 * @returns {Promise<any|null>} Objek event atau null jika tidak ditemukan.
 */
export const getEventById = async (id: string) => {
  if (!id) return null;
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error(`Gagal mengambil data untuk event ID ${id}:`, error);
    return null;
  }
};

/**
 * Mendapatkan URL gambar yang lengkap.
 * @param {string} posterUrl - Path poster dari API.
 * @returns {string} URL lengkap ke gambar.
 */
export const getFullImageUrl = (posterUrl: string) => {
  if (!posterUrl) return ""; // Fallback jika URL kosong
  return `${BASE_URL}${posterUrl}`;
};

/**
 * Memformat angka menjadi format mata uang Rupiah.
 * @param {number} price - Harga dalam bentuk angka.
 * @returns {string} Harga dalam format Rupiah.
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Memformat tanggal menjadi format yang mudah dibaca.
 * @param {string} dateString - Tanggal dalam format ISO string.
 * @returns {string} Tanggal yang sudah diformat.
 */
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

/**
 * Menghitung durasi antara dua waktu.
 * @param {string} startTime - Waktu mulai ISO string.
 * @param {string} endTime - Waktu selesai ISO string.
 * @returns {string} Durasi dalam format "X jam Y menit".
 */
export const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();

    if (isNaN(diffMs) || diffMs < 0) return "Durasi tidak tersedia";

    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let durationString = '';
    if (hours > 0) durationString += `${hours} jam `;
    if (minutes > 0) durationString += `${minutes} menit`;

    return durationString.trim() || "Kurang dari 1 menit";
};

export async function createTransaction(payload: TransactionPayload) {
  const formData = new FormData();

  // Menambahkan semua data ke FormData sesuai dengan key dari backend
  formData.append('event_id', payload.event_id);
  formData.append('nama_pembeli', payload.nama_pembeli);
  formData.append('nomor_pembeli', payload.nomor_pembeli);
  formData.append('email_pembeli', payload.email_pembeli);
  formData.append('jumlah_tiket', payload.jumlah_tiket.toString());
  formData.append('total_harga', payload.total_harga.toString());
  formData.append('payment_status', payload.payment_status);
  formData.append('payment_method_id', payload.payment_method_id.toString());
  formData.append('status_transaksi', payload.status_transaksi);
  formData.append('kode_transaksi', payload.kode_transaksi);
  
  if (payload.bukti_bayar) {
    formData.append('bukti_bayar', payload.bukti_bayar);
  }

  // Ganti URL dengan endpoint API yang Anda berikan
  const response = await fetch('http://localhost:8000/api/transaksi-tiket', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal membuat transaksi.');
  }

  return response.json();
}