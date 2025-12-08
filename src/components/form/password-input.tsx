"use client";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import FormInput from "./form-input";

type PasswordFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  isAsterisk?: boolean;
  disabled?: boolean;
  description?: string;
};

export const PasswordField = ({
  name,
  label,
  placeholder = "********",
  isAsterisk,
  disabled,
  description,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // We create the button element to pass as the suffix
  const toggleVisibilityButton = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      disabled={disabled}
      className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <EyeClosedIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );

  return (
    <FormInput
      name={name}
      label={label}
      placeholder={placeholder}
      isAsterisk={isAsterisk}
      disabled={disabled}
      description={description}
      type={showPassword ? "text" : "password"}
      suffix={toggleVisibilityButton}
    />
  );
};
