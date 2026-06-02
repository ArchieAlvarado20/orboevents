import { ZoneFormType } from "@/types/zone.type";
import { MoreVertical, Edit, Trash2, MapPin } from "lucide-react";

interface ZoneCardProps {
  zone: ZoneFormType;
  onEdit: (zone: ZoneFormType) => void;
  onDelete: (zone: ZoneFormType) => void;
}

export default function ZoneCard({ zone, onEdit, onDelete }: ZoneCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-md transition group">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="text-indigo-600" size={20} />

          <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
            {zone.name}
          </h3>
        </div>

        <button className="hidden text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-500 mb-4">
        {zone.description || "No description provided"}
      </p>

      {/* TYPE */}
      <div className="mb-4">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider text-slate-50 ${
            zone.isActive ? "bg-green-400" : "bg-slate-600"
          }`}
        >
          {zone.isActive ? "active" : "inactive"}
        </span>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
        {/* EDIT */}
        <button
          onClick={() => onEdit(zone)}
          className="p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition"
        >
          <Edit size={18} />
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(zone)}
          className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
