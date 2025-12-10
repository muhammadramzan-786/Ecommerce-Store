import React from "react";

// function Input({ value, placeholder, onInput, onChange, type = "text", className="", id, required,name, onKeyDown, min="", step="", accept, multiple, maxLength }) {
//   return (
//     <input
//       type={type} id={id} name={name}
//       value={value} required={required} min={min} step={step} accept={accept} multiple={multiple}
//       placeholder={placeholder}
//       onInput={onInput} maxLength={maxLength}
//       onChange={onChange} onKeyDown={onKeyDown}
//       className={`peer w-full bg-transparent text-gray-950 font-sans font-medium outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-3 rounded-lg border-gray-300 focus:border-[#4B3EC4] ${className}`}
//     />
//   );
// }
function Input({ className="", error,  ...rest }) {
  return (
    <input
      {...rest}
      className={`peer w-full bg-transparent text-gray-950 font-sans font-medium outline-0 
      border text-sm px-3 py-3 rounded-lg ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#4B3EC4]"} ${className}`}
    />
  );
}

export default Input;
