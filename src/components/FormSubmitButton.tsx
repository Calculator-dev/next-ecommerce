"use client";

import React, { ComponentProps } from "react";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// we are using type because we need to extend this type and we cannot do this with interfaces
// Using Components Props not only the props from FormSubmitButtonProps will be accpeted but all props in normal button
type FormSubmitButtonProps = {
  children: React.ReactNode;
  classname?: string;
} & ComponentProps<"button">;
export const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending}
      className={`btn btn-primary ${className}`}
      type="submit"
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};
