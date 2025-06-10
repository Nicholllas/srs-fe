import Link from "next/link";

interface TermsAndConditionsProps {
  agreedToTerms: boolean;
  setAgreedToTerms: (value: boolean) => void;
}

const TermsAndConditions = ({
  agreedToTerms,
  setAgreedToTerms,
}: TermsAndConditionsProps) => {
  return (
    <div className="mb-8 flex items-center gap-3 text-sm text-gray-600">
      <input
        type="checkbox"
        id="terms"
        checked={agreedToTerms}
        onChange={() => setAgreedToTerms(!agreedToTerms)}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-600"
      />
      <label htmlFor="terms" className="cursor-pointer">
        I agree to the{" "}
        <Link href="#" className="text-red-600 underline">
          terms and conditions
        </Link>
        .
      </label>
    </div>
  );
};

export default TermsAndConditions;
