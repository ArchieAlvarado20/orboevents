import ZoneCard from "@/components/features/zone/zoneCard";
import ZoneModal from "@/components/features/zone/zoneModal";
import Button from "@/components/shared/Button";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import Unauthorized from "@/components/shared/Unauthorized";
import useZones from "@/hooks/zone/useZone";
import { confirmToast } from "@/lib/confirmToast";
import { ZoneFormType } from "@/types/zone.type";
import { List, MapPin, Plus, Search, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function ZonePage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { zones, loading, deleteZone, fetchZones, unauthorized } = useZones();

  const handleDeleteZone = (zone: any) => {
    confirmToast("Delete this zone?", async () => {
      await deleteZone(zone._id);
    });
  };

  const handleEdit = (zone: ZoneFormType) => {
    setSelectedZone(zone);
    setOpenModal(true);
  };

  const zonesCount = zones.length;

  if (loading) {
    return <TransparentSpinner />;
  }

  return (
    <>
      {unauthorized ? (
        <div className="md:ml-64 sm:m-auto">
          <Unauthorized message="Admin access only!" />
        </div>
      ) : (
        <main className="min-h-screen p-6 bg-slate-50">
          {/* MODAL */}
          <ZoneModal
            open={openModal}
            zone={selectedZone}
            onClose={() => {
              setOpenModal(false);
              setSelectedZone(null);
            }}
            onSuccess={() => {
              fetchZones();
              setOpenModal(false);
              setSelectedZone(null);
            }}
          />

          {/* HEADER */}
          <header className="w-full bg-white/80 backdrop-blur-md flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-semibold text-slate-900">
              Zones & Access Control
            </h2>

            <Button onClick={() => setOpenModal(true)} variant="primary">
              <Plus className="sm:hidden" />
              <span className="hidden sm:inline">Add Zone</span>
            </Button>
          </header>

          {/* SEARCH */}
          <section className="hidden flex items-center gap-3 mb-4">
            <div className="relative flex-1 md:flex-none">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm"
                placeholder="Search zones..."
                type="text"
              />
            </div>

            <button className="p-2 border rounded-lg bg-white">
              <List className="w-5 h-5" />
            </button>
          </section>

          {/* EMPTY STATE */}
          {zones.length === 0 ? (
            <div className="bg-white border-slate-400 w-full rounded-3xl p-12 border border-dashed text-center">
              <MapPin className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No zones found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {zones.map((zone) => (
                <ZoneCard
                  key={zone._id}
                  zone={zone}
                  onEdit={() => handleEdit(zone)}
                  onDelete={() => handleDeleteZone(zone)}
                />
              ))}
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-8 p-6 text-center border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-sm text-slate-500">
              Total {zonesCount} zones defined. Zones control physical access
              points.
            </p>
          </div>
        </main>
      )}
    </>
  );
}
