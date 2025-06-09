import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const ControlledInput = ({
  name,
  control,
  placeholder,
  type = "text",
  rules = {},
  autoFocus = false,
  label,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const currentType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="h-[60px] relative">
            <Input
              {...field}
              placeholder={placeholder}
              type={currentType}
              className={`${fieldState.error ? "border-red-500" : ""} ${
                disabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              autoFocus={autoFocus}
              disabled={disabled}
            />
            {isPasswordType && (
              <button
                type="button"
                className="absolute right-3 top-1/4 transform -translate-y-1/4 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1} // Avoid tab stop for the button itself
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
            {fieldState.error && (
              <p className="text-red-500 text-sm ">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ControlledInput;
