export default function Eventstable() {
  return (
    <>
      <div className="p-8 max-w-container-max mx-auto space-y-stack-lg">
        <section className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Recent Transactions
            </h4>
            <a
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              href="#"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Attendee
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        JD
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Jane Doe
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    Summer Music Fest 2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    VIP Pass
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    $299.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    2 mins ago
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
                        BS
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Brian Smith
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    Summer Music Fest 2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    General Entry
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    $89.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    15 mins ago
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">
                        AL
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Alice Lawson
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    Global Tech Summit
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    Early Bird
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    $150.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    1 hour ago
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
