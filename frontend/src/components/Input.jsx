import React from "react";
import clsx from "clsx";

const Input = React.forwardRef(
  ({ label, error, className, labelClassName, ...props }, ref) => {
    return (
      <label className={clsx("block text-sm font-medium text-slate-700 dark:text-slate-200", labelClassName)}>
        {label}
        <input
          ref={ref}
          {...props}
          aria-invalid={Boolean(error)}
          className={clsx(
            "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200",
            "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800",
            error &&
              "border-rose-500 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-950",
            className
          )}
        />
        {error ? (
          <span className="mt-1 block text-xs text-rose-600">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
