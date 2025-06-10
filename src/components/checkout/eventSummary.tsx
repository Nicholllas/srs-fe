import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Concert } from "@/lib/concerts";

interface EventSummaryProps {
  concert: Concert;
}

const EventSummary = ({ concert }: EventSummaryProps) => {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Event Summary
      </h2>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={concert.imageUrl}
            alt={concert.title}
            width={120}
            height={120}
            className="h-24 w-24 object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {concert.title}
          </h3>
          <p className="text-gray-600">by {concert.artist}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{concert.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            <span>
              {concert.venue}, {concert.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
