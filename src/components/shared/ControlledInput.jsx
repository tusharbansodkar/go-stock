import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

const ControlledInput = ({
  name,
  control,
  placeholder,
  type = "text",
  rules = {},
  autoFocus = false,
  id,
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="h-[60px]">
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className={fieldState.error && "border-red-500"}
              autoFocus={autoFocus}
              id={name}
            />
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
