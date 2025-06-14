export interface Concert {
  id: number;
  title: string;
  date: string;
  venue: string;
  city: string;
  address: string; // Properti baru
  price: number;
  imageUrl: string;
  bannerUrl: string; // Properti baru
  category: string;
  description: string;
  artist: string; 
  duration: string;
  organizer: string; // Properti baru
  organizerImage: string; // Properti baru
  followers: string; // Properti baru
  eventsCount: number; // Properti baru
  rating: number; // Properti baru
}

export const concerts: Concert[] = [
  {
    id: 1,
    title: "Coldplay: Music of the Spheres World Tour",
    date: "15 Nov 2023",
    venue: "GBK Stadium",
    city: "Jakarta",
    address: "Jl. Gelora Bung Karno, Senayan",
    price: 1000000,
    imageUrl: "/images/hero/coldplay.jpg",
    bannerUrl: "/images/hero/coldplay.jpg",
    category: "international",
    description: "Konser spektakuler dari Coldplay di Jakarta.",
    artist: "Coldplay",
    duration: "19:00 - 23:00 WIB",
    organizer: "Live Nation",
    organizerImage: "/images/hero/coldplay.jpg",
    followers: "5000",
    eventsCount: 10,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Blackpink: Born Pink World Tour",
    date: "10 Des 2023",
    venue: "Stadion Madya GBK",
    city: "Jakarta",
    address: "Jl. Gelora Bung Karno, Senayan",
    price: 1000000,
    imageUrl: "/images/hero/blackpink.jpg",
    bannerUrl: "/images/hero/blackpink.jpg",
    category: "kpop",
    description: "Konser spektakuler dari Blackpink di Jakarta.",
    artist: "Blackpink",
    duration: "19:00 - 23:00 WIB",
    organizer: "YG Entertainment",
    organizerImage: "/images/hero/coldplay.jpg",
    followers: "8000",
    eventsCount: 5,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Java Jazz Festival 2024",
    date: "2-4 Mar 2024",
    venue: "Jakarta International Expo",
    city: "Jakarta",
    address: "Jl. H. Benyamin Sueb, Kemayoran",
    price: 1000000,
    imageUrl: "/images/hero/javajazz.jpg",
    bannerUrl: "/images/hero/javajazz.jpg",
    category: "jazz",
    description: "Festival musik Jazz terbesar di Jakarta.",
    artist: "Various Artists",
    duration: "19:00 - 23:00 WIB",
    organizer: "Java Festival Production",
    organizerImage: "/images/hero/coldplay.jpg",
    followers: "3000",
    eventsCount: 15,
    rating: 4.7,
  },
  {
    id: 4,
    title: "We The Fest 2023",
    date: "21-23 Jul 2023",
    venue: "GBK Sports Complex",
    city: "Jakarta",
    address: "Jl. Gelora Bung Karno, Senayan",
    price: 1000000,
    imageUrl: "/images/hero/wethefest.jpg",
    bannerUrl: "/images/hero/wethefest.jpg",
    category: "pop",
    description: "Festival musik We The Fest tahun 2023.",
    artist: "Various Artists",
    duration: "19:00 - 23:00 WIB",
    organizer: "Ismaya Live",
    organizerImage: "/images/hero/coldplay.jpg",
    followers: "6000",
    eventsCount: 8,
    rating: 4.6,
  },
];
