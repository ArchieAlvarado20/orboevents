import React, { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { showInfo } from "@/lib/toast";

export interface FileUploadProps {
  label?: React.ReactNode;
  onChange: (file: File | null) => void;
  value?: File | null;
  preview: string;
  accept?: string;
  error?: string;
  clickNote?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  value,
  preview,
  accept = "image/*",
  error,
  clickNote,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) {
      showInfo("Only users can edit their avatar");
      return;
    }

    inputRef.current?.click();
  };
  const imageSrc = value
    ? URL.createObjectURL(value)
    : preview || "/images/user.jpg";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700  mb-2">
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50  group transition-colors
        ${
          error
            ? "border-red-500"
            : "border-slate-200  hover:border-indigo-400 cursor-pointer"
        }`}
      >
        {preview ? (
          <img
            src={imageSrc}
            alt="preview"
            className="h-full object-cover rounded-xl"
          />
        ) : (
          <>
            <ImagePlus className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 mb-2" />
            <p className="text-sm font-medium text-slate-500 group-hover:text-indigo-600">
              {clickNote}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Recommended size: 1200x630px
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
