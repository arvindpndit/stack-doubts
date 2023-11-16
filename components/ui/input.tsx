// ShadcnInput.tsx

import React, { InputHTMLAttributes } from "react";

// Import Tailwind CSS styles
import "tailwindcss/tailwind.css";

// Define props interface by extending InputHTMLAttributes
interface ShadcnInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // You can add additional props specific to your Shadcn input component here
}

const Input: React.FC<ShadcnInputProps> = ({ ...props }) => {
  return (
    <input
      className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
      {...props}
    />
  );
};

export default Input;
