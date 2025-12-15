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
import { Textarea } from "@/components/ui/textarea";
import InfoTooltip from "./info-tooltip";

type FormTextareaProps = {
  name: string;
  label?: string;
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
  rows?: number;
  [key: string]: unknown;
};

const FormTextarea: React.FC<FormTextareaProps> = memo(
  ({
    name,
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
    rows = 4, // Default rows
    ...rest
  }) => {
    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const { value, onChange, ...fieldProps } = field;

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

              <div className="relative">
                <Textarea
                  id={name}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={rows}
                  value={value || ""}
                  onChange={(e: any) => {
                    onChange(e);
                    onInputChange(e.target.value);
                  }}
                  // Removed 'h-12' to allow rows to dictate height.
                  // Added 'resize-none' by default, remove if you want user resizing.
                  className={`${className} placeholder:text-gray-light min-h-[80px] resize-y tracking-wider`}
                  {...fieldProps}
                  {...rest}
                />

                {/* Suffix Positioning: Changed from items-center to top aligned */}
                {suffix && (
                  <div className="absolute top-3 right-3 flex items-start">
                    {suffix}
                  </div>
                )}

                {/* Copy Button Positioning: Changed to top aligned */}
                {enableCopyText && (
                  <button
                    className="absolute top-3 right-5 flex cursor-pointer items-start space-x-1"
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

FormTextarea.displayName = "FormTextarea";
export default FormTextarea;
