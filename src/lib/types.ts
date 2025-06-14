export interface EventType {
    id: number;
    nama_event: string;
    deskripsi_event: string;
    tanggal_mulai: string;
    poster_event_url: string;
    lokasi: string;
    harga_tiket: number;
    kapasitas: number; // <-- Properti kapasitas ditambahkan di sini
    venue?: { // Tanda '?' berarti properti ini bisa jadi tidak ada (opsional)
        nama_venue: string;
    };
}