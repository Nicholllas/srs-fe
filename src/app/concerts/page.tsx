/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Ticket, LoaderCircle, Users } from "lucide-react"; 
import { getAllEvents, getFullImageUrl, formatPrice, formatDate } from "@/lib/api/concerts";

interface EventType {
    id: number;
    nama_event: string;
    deskripsi_event: string;
    tanggal_mulai: string;
    poster_event_url: string;
    lokasi: string;
    harga_tiket: number;
    kapasitas: number; 
    venue?: {
        nama_venue: string;
    };
}

export default function ConcertsPage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            // Beri tipe pada data yang diterima untuk konsistensi
            const data: EventType[] = await getAllEvents();
            setEvents(data);
            setLoading(false);
        };

        loadEvents();
    }, []);

    return (
        <section className="bg-white text-gray-900 min-h-screen">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-[#ec1b21]/30 bg-[#ec1b21]/10 px-4 py-2 text-sm">
                        <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#ec1b21]"></span>
                        <span>Semua Konser</span>
                    </div>
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
                        Temukan Konser Favoritmu
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-gray-600">
                        Jelajahi berbagai pilihan konser terbaik dari berbagai genre musik
                        dan dapatkan pengalaman live musik yang tak terlupakan.
                    </p>
                </div>
                
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <LoaderCircle className="h-12 w-12 animate-spin text-[#ec1b21]" />
                    </div>
                )}

                {!loading && events.length > 0 && (
                    <motion.div
                        layout
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence>
                            {events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="relative aspect-[4/3] w-full">
                                        <img
                                            src={getFullImageUrl(event.poster_event_url)}
                                            alt={event.nama_event}
                                            className="absolute h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="mb-2 text-xl font-bold">{event.nama_event}</h3>
                                        <p className="mb-4 text-gray-600 line-clamp-2 flex-grow">
                                            {event.deskripsi_event}
                                        </p>
                                        <div className="mb-6 space-y-3">
                                            <div className="flex items-center">
                                                <Calendar className="mr-3 h-5 w-5 text-[#ec1b21]" />
                                                <span className="text-gray-700">{formatDate(event.tanggal_mulai)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="mr-3 h-5 w-5 text-[#ec1b21]" />
                                                <span className="text-gray-700">{event.venue?.nama_venue || event.lokasi}</span>
                                            </div>
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!loading && events.length === 0 && (
                   <div className="col-span-full py-12 text-center">
                     <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                       <Ticket className="h-8 w-8 text-gray-400" />
                     </div>
                     <h3 className="mb-2 text-xl font-bold text-gray-900">
                       Tidak ada konser yang tersedia
                     </h3>
                     <p className="text-gray-600">
                       Maaf, saat ini tidak ada konser yang dijadwalkan. Silakan periksa kembali nanti.
                     </p>
                   </div>
                )}
            </div>
        </section>
    );
}