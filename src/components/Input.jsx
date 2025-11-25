import React from "react";

function Input({ value, placeholder, onInput, onChange, type = "text", className="", id, required,name, onKeyDown, min="", step="", accept, multiple }) {
  return (
    <input
      type={type} id={id} name={name}
      value={value} required={required} min={min} step={step} accept={accept} multiple={multiple}
      placeholder={placeholder}
      onInput={onInput}
      onChange={onChange} onKeyDown={onKeyDown}
      className={`peer w-full bg-transparent text-gray-950 font-sans font-medium outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:ring-1 text-sm px-3 py-3 rounded-md border-gray-300 focus:border-gray-900 ${className}`}
    />
  );
}

export default Input;
