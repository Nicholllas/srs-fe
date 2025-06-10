import { Concert } from "@/lib/concerts";

export type CurrencyFormatter = (value: number) => string;

export interface CustomerInfo {
  name: string;
  email: string;
  whatsappNumber: string;
}

export interface CheckoutPageProps {
  params: { id: string };
}

export interface EventSummaryProps {
  concert: Concert;
}

export interface TicketSelectionProps {
  ticketPrice: number;
  ticketQuantity: number;
  formatRupiah: CurrencyFormatter;
  handleQuantityChange: (newQuantity: number) => void;
}

export interface OrderSummaryProps {
  ticketQuantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  formatRupiah: CurrencyFormatter;
}

export interface TermsAndConditionsProps {
  agreedToTerms: boolean;
  setAgreedToTerms: (value: boolean) => void;
}

export interface CheckoutButtonProps {
  agreedToTerms: boolean;
  total: number;
  formatRupiah: CurrencyFormatter;
  handleCheckout: () => void;
}

export interface PaymentMethodProps {
  selectedPayment: string;
  setSelectedPayment: (method: string) => void;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
  total: number;
  formatRupiah: CurrencyFormatter;
}

export interface BankTransferPaymentProps {
  total: number;
  formatRupiah: CurrencyFormatter;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
}

export interface QRCodePaymentProps {
  total: number;
  formatRupiah: CurrencyFormatter;
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
}

export interface FileUploadProps {
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
  label: string;
  description: string;
}
