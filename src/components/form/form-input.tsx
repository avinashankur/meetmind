"use client";

import type React from "react";
import { memo } from "react";
import { AlertCircle, Copy } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InfoTooltip from "./info-tooltip";

type FormInputProps = {
  name: string;
  type?: string;
  label?: string;
  itemLabel?: string;
  placeholder?: string;
  info?: string;
  onInputChange?: (value: string) => void;
  description?: React.ReactNode | string;
  isAsterisk?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  showError?: boolean;
  suffix?: React.ReactNode;
  enableCopyText?: boolean;
  [key: string]: unknown;
};

const FormInput: React.FC<FormInputProps> = memo(
  ({
    name,
    type = "text",
    label = "",
    placeholder = "",
    info = "",
    onInputChange = () => {},
    description,
    isAsterisk = false,
    className = "",
    containerClassName = "",
    disabled = false,
    showError = true,
    suffix,
    enableCopyText = false,
    ...rest
  }) => {
    // 1. We still access the form context
    const { control } = useFormContext();

    return (
      // 2. Use Controller directly instead of FormField
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const { value, onChange, ...fieldProps } = field;

          // 3. The Field component acts as the wrapper (formerly FormItem)
          return (
            <Field className={`w-full ${containerClassName}`}>
              {label && (
                <FieldLabel htmlFor={name}>
                  <div className="flex flex-row items-center">
                    <span className="text-small mr-1 font-medium">
                      {label}
                      {isAsterisk && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </span>
                    {info && (
                      <div className="flex rounded-full bg-neutral-700 p-0 text-white">
                        <InfoTooltip info={info} />
                      </div>
                    )}
                  </div>
                </FieldLabel>
              )}

              {/* Input Wrapper for Copy Button */}
              <div className="relative">
                <Input
                  id={name}
                  placeholder={placeholder}
                  type={type}
                  disabled={disabled}
                  value={value || ""} // Handle potentially undefined value
                  onChange={(e) => {
                    onChange(e);
                    onInputChange(e.target.value);
                  }}
                  className={`${className} placeholder:text-gray-light h-12 rounded-xl tracking-wider`}
                  {...fieldProps}
                  {...rest}
                />

                {suffix && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {suffix}
                  </div>
                )}

                {enableCopyText && (
                  <button
                    className="absolute inset-y-0 right-5 flex cursor-pointer items-center space-x-1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(value);
                    }}
                    type="button"
                    aria-label="Copy text"
                  >
                    <Copy className="text-muted-foreground" size={16} />
                  </button>
                )}
              </div>

              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}

              {/* 4. Explicitly render FieldError with the error message */}
              {showError && error && (
                <FieldError className="flex items-center gap-x-1">
                  <AlertCircle className="text-destructive h-4 w-4" />
                  {error.message}
                </FieldError>
              )}
            </Field>
          );
        }}
      />
    );
  },
);

FormInput.displayName = "FormInput";
export default FormInput;
