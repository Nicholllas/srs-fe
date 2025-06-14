import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
// GANTI: Hapus import tipe 'Concert' yang lama
// import { Concert } from "@/lib/concerts";

// TAMBAH: Impor fungsi helper untuk format tanggal dan URL gambar
// (Asumsi fungsi ini ada di lib/api/concerts.ts atau file helper lain)
import { getFullImageUrl, formatDate } from "@/lib/api/concerts";

// TAMBAH: Definisikan tipe data dari API di satu tempat agar bisa di-reuse
// (Lebih baik lagi jika tipe ini ada di file terpusat, misal: lib/types.ts)
import { EventData } from "@/lib/checkoutEventData"; 

// GANTI: Ubah nama dan tipe props
interface EventSummaryProps {
   event: EventData; // Prop sekarang bernama 'event' dengan tipe 'EventData'
}

const EventSummary = ({ event }: EventSummaryProps) => {
   return (
     <div className="mb-8 rounded-xl border border-gray-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Event Summary
        </h2>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 overflow-hidden rounded-lg">
             {/* GANTI: Gunakan properti dari API */}
             <Image
               src={getFullImageUrl(event.poster_event_url)}
               alt={event.nama_event}
               width={120}
               height={120}
               className="h-24 w-24 object-cover"
             />
          </div>
          <div>
             {/* GANTI: Gunakan 'nama_event' */}
             <h3 className="text-lg font-semibold text-gray-900">
               {event.nama_event}
             </h3>

             {/* CATATAN: Data API tidak memiliki 'artist', jadi kita bisa hapus baris ini */}
             {/* <p className="text-gray-600">by {concert.artist}</p> */}

             <div className="mt-2 flex items-center text-sm text-gray-500">
               <Calendar className="mr-1 h-4 w-4" />
               {/* GANTI: Gunakan 'tanggal_mulai' dan format tanggalnya */}
               <span>{formatDate(event.tanggal_mulai)}</span>
             </div>
             <div className="flex items-center text-sm text-gray-500">
               <MapPin className="mr-1 h-4 w-4" />
               {/* GANTI: Gunakan data dari 'venue' */}
               <span>
                  {event.venue.nama_venue}
               </span>
             </div>
          </div>
        </div>
     </div>
   );
};

export default EventSummary;