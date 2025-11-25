import React, { useEffect } from "react";

export default function Button({
  text = "",
  onClick,
  icon: Icon,
  title="",
  loading = false,
  disabled = false,
  type = "button",
  className = "bg-[#4B3EC4] hover:opacity-90 text-white px-4 py-2.5",
}) {

  return (
    <button
      type={type} title={title}
      onClick={onClick}
      disabled={disabled || loading}
      className={`space-x-2 rounded-lg flex items-center justify-center
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""} whitespace-nowrap ${className}`}
    >
     
        <>
          {Icon && <Icon />}
        </>
      
      {text && <span>{text}</span>}
    </button>
  );
}
