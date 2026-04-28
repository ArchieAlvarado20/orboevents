import React, { useRef } from "react";
import { ImagePlus } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  accept?: string;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  value,
  accept = "image/*",
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        className={`w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/50 group transition-colors
        ${
          error
            ? "border-red-500"
            : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer"
        }`}
      >
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="preview"
            className="h-full object-cover rounded-xl"
          />
        ) : (
          <>
            <ImagePlus className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 mb-2" />
            <p className="text-sm font-medium text-slate-500 group-hover:text-indigo-600">
              Click to upload event image
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
