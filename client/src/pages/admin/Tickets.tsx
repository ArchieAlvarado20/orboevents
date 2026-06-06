import ComingSoon from "@/components/shared/ComingSoon";

export default function Ticket() {
  return (
    <>
      <main className="flex-1 mb-12 p-4 min-h-screen overflow-y-auto">
        <div className="max-w-container-max mx-auto">
          {/* <!-- Page Header --> */}
          <div className="mb-0 space-y-1">
            <ComingSoon />
          </div>
        </div>
      </main>
    </>
  );
}
