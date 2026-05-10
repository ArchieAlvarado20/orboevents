import React, { useRef } from "react";
import { Camera } from "lucide-react";

export interface FileUploadProps {
  label?: React.ReactNode;
  onChange: (file: File | null) => void;
  value?: File | null;
  preview: string;
  accept?: string;
  error?: string;
  clickNote?: string;
}

const UserFileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  value,
  preview,
  accept = "image/*",
  error,
  clickNote,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const imageSrc = value
    ? URL.createObjectURL(value)
    : preview || "/images/user.jpg";

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      )}

      {/* Avatar */}
      <div
        onClick={handleClick}
        className="relative group w-32 h-32 cursor-pointer"
      >
        <img
          src={imageSrc}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Camera Button */}
        <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-md transition hover:scale-110 hover:bg-black">
          <Camera size={18} />
        </div>
      </div>

      {/* Optional Note */}
      {clickNote && <p className="text-sm text-slate-500">{clickNote}</p>}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default UserFileUpload;
