// File: components/checkout/checkoutButton.tsx

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface CheckoutButtonProps {
  total: number;
  formatRupiah: (value: number) => string;
  isPlacingOrder: boolean;
  handleCheckout: () => void;
}

export default function CheckoutButton({
  total,
  formatRupiah,
  isPlacingOrder,
  handleCheckout,
}: CheckoutButtonProps) {
  return (
    <div className="mt-8">
      <Button
        size="lg"
        className="flex w-full items-center justify-center bg-[#ec1b21] text-white hover:bg-[#c5161b] disabled:cursor-not-allowed disabled:bg-gray-400"
        onClick={handleCheckout}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Memproses Pesanan...
          </>
        ) : (
          `Bayar ${formatRupiah(total)}`
        )}
      </Button>
    </div>
  );
}