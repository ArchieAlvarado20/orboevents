import {
  categoryIconMap,
  categoryIconOptions,
} from "@/types/categoryIcon.type";
import { MoreVertical, Edit, Trash2, FolderKanban, Circle } from "lucide-react";

interface CategoryType {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  status?: "active" | "inactive";
}

interface CategoryCardProps {
  category: CategoryType;
  onEdit: (category: CategoryType) => void;
  onDelete: (category: CategoryType) => void;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const statusStyle = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-600",
  };

  const iconItem = categoryIconOptions.find(
    (item) => item.value === category.icon,
  );

  const Icon = iconItem?.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-md transition group">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
            {Icon && <Icon className="text-indigo-600" size={22} />}
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
              {category.name}
            </h3>

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Event Category
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-slate-500 mb-5 line-clamp-3 min-h-[60px]">
        {category.description || "No description provided"}
      </p>

      {/* STATUS */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
            statusStyle[category.status || "active"]
          }`}
        >
          {category.status || "active"}
        </span>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Circle size={10} className="fill-current" />
          {category.status} Module
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-slate-100">
        <button
          onClick={() => onEdit(category)}
          className="p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => onDelete(category)}
          className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
