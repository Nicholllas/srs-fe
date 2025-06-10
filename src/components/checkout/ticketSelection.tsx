interface TicketSelectionProps {
  ticketPrice: number;
  ticketQuantity: number;
  formatRupiah: (value: number) => string;
  handleQuantityChange: (newQuantity: number) => void;
}

const TicketSelection = ({
  ticketPrice,
  ticketQuantity,
  formatRupiah,
  handleQuantityChange,
}: TicketSelectionProps) => {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Ticket Selection
      </h2>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                General Admission
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                {formatRupiah(ticketPrice)}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(ticketQuantity - 1)}
                    className="h-8 w-8 rounded-l border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="flex h-8 w-12 items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
                    {ticketQuantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(ticketQuantity + 1)}
                    className="h-8 w-8 rounded-r border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketSelection;
