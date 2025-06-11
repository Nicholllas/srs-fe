import { Banknote } from "lucide-react";
import FileUpload from "./fileUpload";
import { CurrencyFormatter } from "@/types";

interface BankTransferPaymentProps {
  total: number;
  formatRupiah: CurrencyFormatter;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
}

const BankTransferPayment = ({
  total,
  formatRupiah,
  paymentProof,
  handleFileChange,
}: BankTransferPaymentProps) => {
  return (
    <div className="mt-6 rounded-xl bg-gray-50 p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec1b21] text-white">
          <Banknote className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Bank Transfer</h3>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#ec1b21] to-[#ff6b6b] p-4">
          <div className="flex justify-between text-white">
            <span className="text-sm font-medium">BCA</span>
            <span className="text-xs">Virtual Account</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500">Account Number</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-lg font-bold tracking-wider text-gray-900">
                  8770782300
                </p>
                <button
                  className="text-[#ec1b21] hover:text-[#c5161b]"
                  aria-label="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Name</p>
              <p className="font-medium text-gray-900">Joko</p>
            </div>
          </div>
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Transfer Amount</p>
            <p className="text-lg font-bold text-[#ec1b21]">
              {formatRupiah(total)}
            </p>
          </div>
        </div>
      </div>

      <FileUpload
        paymentProof={paymentProof}
        handleFileChange={handleFileChange}
        label="Upload Payment Proof"
        description="Upload screenshot of your bank transfer confirmation"
      />

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h4 className="mb-2 text-sm font-medium text-blue-800">
          Payment Instructions
        </h4>
        <ul className="space-y-2 text-xs text-blue-700">
          <li className="flex items-start gap-2">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Transfer the exact amount shown above</span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Payment will be verified within 1 hour</span>
          </li>
          <li className="flex items-start gap-2">
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tickets will be sent via email after verification</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankTransferPayment;
