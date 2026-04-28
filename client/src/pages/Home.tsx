import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>🎟️ Smart Ticketing System</h1>

      <nav>
        <Link to="/scan">Scanner</Link> | <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}
