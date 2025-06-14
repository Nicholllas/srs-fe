"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, MapPin, Ticket, LoaderCircle, Users } from "lucide-react"; 
import Link from "next/link";
import { getAllEvents, getFullImageUrl, formatPrice, formatDate } from "@/lib/api/concerts";
import { EventType } from "@/lib/types"; 
import Image from "next/image";

export default function FeaturedConcerts() {
   const [featuredEvents, setFeaturedEvents] = useState<EventType[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const loadFeaturedEvents = async () => {
        const allEvents: EventType[] = await getAllEvents(); // Beri tipe juga di sini untuk konsistensi
        setFeaturedEvents(allEvents.slice(0, 3));
        setLoading(false);
     };

     loadFeaturedEvents();
   }, []);

   return (
     <section className="bg-white py-16 text-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
             <div>
               <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
                  <span>Konser Unggulan</span>
               </div>
               <h2 className="text-3xl font-bold md:text-4xl">
                  Rekomendasi Konser Terbaik
               </h2>
             </div>
             <Link
               href="/concerts"
               className="mt-4 inline-flex items-center font-medium text-[#ec1b21] hover:text-[#c5161b] md:mt-0"
             >
               Lihat Semua Konser <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
          </div>

          {loading && (
             <div className="flex justify-center items-center py-12">
               <LoaderCircle className="h-10 w-10 animate-spin text-[#ec1b21]" />
             </div>
          )}

          {!loading && (
             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
               {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] w-full">
                       <Image
                          src={getFullImageUrl(event.poster_event_url)}
                          alt={event.nama_event}
                          fill // 'fill' akan membuat gambar mengisi penuh parent div
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Membantu Next.js memilih ukuran gambar yang tepat
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                       <h3 className="mb-3 text-xl font-bold line-clamp-2">
                         {event.nama_event}
                       </h3>
                       <div className="mb-6 space-y-3">
                         <div className="flex items-center">
                            <Calendar className="mr-3 h-5 w-5 text-[#ec1b21]" />
                            <span className="text-gray-700">{formatDate(event.tanggal_mulai)}</span>
                         </div>
                         <div className="flex items-center">
                            <MapPin className="mr-3 h-5 w-5 text-[#ec1b21]" />
                            <span className="text-gray-700">{event.venue?.nama_venue || event.lokasi}</span>
                         </div>
                      {/* 4. TAMPILKAN INFORMASI KAPASITAS */}
                         <div className="flex items-center">
                            <Users className="mr-3 h-5 w-5 text-[#ec1b21]" />
                            <span className="text-gray-700">Kapasitas: {event.kapasitas.toLocaleString('id-ID')}</span>
                         </div>
                         <div className="flex items-center">
                            <Ticket className="mr-3 h-5 w-5 text-[#ec1b21]" />
                            <span className="font-medium text-gray-900">
                              {formatPrice(event.harga_tiket)}
                            </span>
                         </div>
                       </div>
                       <Link
                         href={`/concerts/${event.id}`}
                         className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#ec1b21] px-6 py-3 font-medium text-white transition-all hover:bg-[#c5161b] hover:shadow-md"
                       >
                         Beli Tiket
                       </Link>
                    </div>
                  </div>
               ))}
             </div>
          )}
        </div>
     </section>
   );
}