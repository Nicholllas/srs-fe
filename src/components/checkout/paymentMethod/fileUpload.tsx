import { ChangeEvent } from "react";

interface FileUploadProps {
  paymentProof: File | null;
  handleFileChange: (file: File | null) => void;
  label: string;
  description: string;
}

const FileUpload = ({
  paymentProof,
  handleFileChange,
  label,
  description,
}: FileUploadProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-900">{label}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <label
        htmlFor="payment-proof"
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
          paymentProof
            ? "border-green-300 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
        } p-6 transition-colors`}
      >
        {paymentProof ? (
          <div className="text-center">
            <svg
              className="mx-auto h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="mt-2 text-sm font-medium text-gray-900">
              {paymentProof.name}
            </p>
            <p className="mt-1 text-xs text-green-600">Upload successful</p>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <div className="mt-2 flex text-sm text-gray-600">
              <span className="font-medium text-[#ec1b21]">
                Click to upload
              </span>
              <span className="pl-1">or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
          </div>
        )}
        <input
          type="file"
          id="payment-proof"
          accept="image/*,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />
      </label>

      {paymentProof && (
        <button
          onClick={() => handleFileChange(null)}
          className="w-full rounded-md bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Change File
        </button>
      )}
    </div>
  );
};

export default FileUpload;
