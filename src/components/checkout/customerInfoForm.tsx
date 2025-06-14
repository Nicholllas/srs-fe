import React from "react";

interface CustomerInfoFormProps {
  customerInfo: {
    name: string;
    email: string;
    whatsappNumber: string;
  };
  setCustomerInfo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      whatsappNumber: string;
    }>
  >;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  customerInfo,
  setCustomerInfo,
}) => {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Customer Information
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21] text-gray-700"
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21]"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="whatsapp"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            value={customerInfo.whatsappNumber}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                whatsappNumber: e.target.value,
              })
            }
            className="text-gray-700 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#ec1b21] focus:outline-none focus:ring-1 focus:ring-[#ec1b21]"
            placeholder="6281234567890"
            required
          />
          <p className="mt-1 text-xs text-gray-900">
            Kami akan mengirimkan invoice dan tiket melalui Email / Whatsapp
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
