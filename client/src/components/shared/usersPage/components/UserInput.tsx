type EmailInputProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  name?: string;
  icon?: React.ReactNode;
  type?: string;
};

export default function UserInput({
  value,
  onChange,
  label,
  placeholder,
  name,
  icon,
  type,
}: EmailInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="relative group">
        {/* icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
          {icon}
        </div>

        {/* input */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 outline-none transition-all"
          required
        />
      </div>
    </div>
  );
}
