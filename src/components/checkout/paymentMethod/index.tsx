import { Banknote, QrCode } from "lucide-react";
import BankTransferPayment from "./bankTransferPayment";
import QRCodePayment from "./QRCodePayment";
import { CurrencyFormatter } from "@/types";

interface PaymentMethodProps {
  selectedPayment: string;
  setSelectedPayment: (method: string) => void;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
  total: number;
  formatRupiah: CurrencyFormatter;
}

const PaymentMethod = ({
  selectedPayment,
  setSelectedPayment,
  paymentProof,
  handleFileChange,
  total,
  formatRupiah,
}: PaymentMethodProps) => {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Payment Method
      </h2>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="payment-bank"
          className="flex cursor-pointer items-center gap-4 rounded border border-gray-300 p-4"
        >
          <input
            type="radio"
            id="payment-bank"
            name="payment"
            checked={selectedPayment === "bank"}
            onChange={() => setSelectedPayment("bank")}
            className="h-4 w-4 cursor-pointer"
          />
          <Banknote className="h-5 w-5 text-gray-900" />
          <span className="text-black">Bank Transfer</span>
        </label>

        <label
          htmlFor="payment-qr"
          className="flex cursor-pointer items-center gap-4 rounded border border-gray-300 p-4"
        >
          <input
            type="radio"
            id="payment-qr"
            name="payment"
            checked={selectedPayment === "qr"}
            onChange={() => setSelectedPayment("qr")}
            className="h-4 w-4 cursor-pointer"
          />
          <QrCode className="h-5 w-5 text-gray-600" />
          <span className="text-black">QR Code</span>
        </label>
      </div>

      {selectedPayment === "bank" && (
        <BankTransferPayment
          total={total}
          formatRupiah={formatRupiah}
          paymentProof={paymentProof}
          handleFileChange={handleFileChange}
        />
      )}

      {selectedPayment === "qr" && (
        <QRCodePayment
          total={total}
          formatRupiah={formatRupiah}
          paymentProof={paymentProof}
          handleFileChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default PaymentMethod;
