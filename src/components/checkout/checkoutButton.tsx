import { Button } from "@/components/ui/button";
import { CurrencyFormatter } from "@/types";

interface CheckoutButtonProps {
  agreedToTerms: boolean;
  total: number;
  formatRupiah: CurrencyFormatter;
  handleCheckout: () => void;
}

const CheckoutButton = ({
  agreedToTerms,
  total,
  formatRupiah,
  handleCheckout,
}: CheckoutButtonProps) => {
  return (
    <Button
      disabled={!agreedToTerms}
      onClick={handleCheckout}
      variant="outline"
      className="w-full bg-[#ec1b21] px-6 text-base font-semibold text-white shadow-md hover:bg-[#c5161b]"
      size="lg"
    >
      Place Order - {formatRupiah(total)}
    </Button>
  );
};

export default CheckoutButton;
