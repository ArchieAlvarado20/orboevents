import logo from "@/assets/logo.png";

export default function Logo({ className = "" }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className={className} />
    </div>
  );
}
