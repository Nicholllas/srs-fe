import Link from "next/link";
import { Concert } from "@/lib/concerts";

interface BreadcrumbProps {
  concert: Concert;
}

const Breadcrumb = ({ concert }: BreadcrumbProps) => {
  return (
    <nav className="mb-6 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center space-x-1">
        <li>
          <Link href="#" className="hover:text-gray-700 hover:underline">
            Home
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li>
          <Link href="#" className="hover:text-gray-700 hover:underline">
            {concert.city}
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li>
          <Link
            href={`/concerts/${concert.id}`}
            className="hover:text-gray-700 hover:underline"
          >
            {concert.title}
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li className="font-medium text-gray-900">Checkout</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
