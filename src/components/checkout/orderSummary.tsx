import { CurrencyFormatter } from "@/types";

interface OrderSummaryProps {
  ticketQuantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  formatRupiah: CurrencyFormatter;
}

const OrderSummary = ({
  ticketQuantity,
  subtotal,
  serviceFee,
  total,
  formatRupiah,
}: OrderSummaryProps) => {
  return (
    <div className="sticky top-28 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Order Summary
      </h2>
      <div className="flex justify-between text-sm text-gray-600">
        <div>Tickets ({ticketQuantity})</div>
        <div>{formatRupiah(subtotal)}</div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <div>Service Fee</div>
        <div>{formatRupiah(serviceFee)}</div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <div>Total</div>
        <div>{formatRupiah(total)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
