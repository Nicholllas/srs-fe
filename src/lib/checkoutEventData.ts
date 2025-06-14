// File: lib/types.ts
export interface EventData {
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
    // Tambahkan properti lain dari API jika dibutuhkan
}