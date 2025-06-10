import Hero from "@/components/Hero";
import FeaturedConcerts from "@/components/concerts/featuredConcerts";
import ScrollUp from "@/components/common/ScrollUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Room Soul - Home",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <FeaturedConcerts />
      {/* <Testimonials /> */}
      {/* <What /> */}
      {/* <Blog /> */}
    </>
  );
}
