import { QrCode } from "lucide-react";
import Image from "next/image";
import FileUpload from "./fileUpload";
import { CurrencyFormatter } from "@/types";

interface QRCodePaymentProps {
  total: number;
  formatRupiah: CurrencyFormatter;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
}

const QRCodePayment = ({
  total,
  formatRupiah,
  paymentProof,
  handleFileChange,
}: QRCodePaymentProps) => {
  return (
    <div className="mt-6 rounded-xl bg-gray-50 p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ec1b21] text-white">
          <QrCode className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">QRIS Payment</h3>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-lg border-4 border-white p-2 shadow-lg">
            <Image
              src="/images/payment/qr-sample.jpeg"
              alt="QRIS Payment Code"
              width={200}
              height={200}
              className="h-48 w-48 object-contain"
            />
          </div>

          <div className="w-full rounded-md bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-500">Payment Amount</p>
            <p className="text-lg font-bold text-[#ec1b21]">
              {formatRupiah(total)}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy QR Code
            </button>
            <button className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download QR
            </button>
          </div>
        </div>
      </div>

      <FileUpload
        paymentProof={paymentProof}
        handleFileChange={handleFileChange}
        label="Upload Payment Proof"
        description="Upload screenshot of your successful payment"
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
            <span>Scan the QR code using your mobile banking app</span>
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
            <span>Payment will be processed instantly</span>
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
            <span>Save your payment confirmation screenshot</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodePayment;
