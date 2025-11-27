import { Link } from "react-router-dom";

export default function AppLink({ to, state = null, children, className = "" }) {
  return (
    <Link
      to={to} state={state}
      className={`text-primary font-medium transition ${className}`}
    >
      {children}
    </Link>
  );
}
