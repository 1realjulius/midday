import { cn } from "@midday/ui/cn";
import { CurrencyInput } from "@midday/ui/currency-input";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { NumericFormatProps } from "react-number-format";

export function VATInput({
  className,
  name,
  ...props
}: Omit<NumericFormatProps, "value" | "onChange"> & {
  name: string;
}) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);

  const isPlaceholder = !value && !isFocused;

  return (
    <div className="relative">
      <CurrencyInput
        suffix="%"
        autoComplete="off"
        value={value}
        onValueChange={(values) => {
          const newValue = Math.min(Math.max(values.floatValue || 0, 0), 100);
          onChange(newValue);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur();
        }}
        {...props}
        className={cn(
          isPlaceholder && "opacity-0",
          className,
          "p-0 border-0 h-6 text-xs !bg-transparent border-b border-transparent focus:border-border font-mono",
        )}
        thousandSeparator={false}
        decimalScale={2}
        allowNegative={false}
        isAllowed={(values) => {
          const { floatValue } = values;
          return (
            floatValue === undefined || (floatValue >= 0 && floatValue <= 100)
          );
        }}
      />
      {isPlaceholder && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]" />
        </div>
      )}
    </div>
  );
}
