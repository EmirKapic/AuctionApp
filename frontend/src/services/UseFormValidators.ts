import { FieldValues, RegisterOptions } from "react-hook-form";

export function emailValidationOptions(): RegisterOptions<FieldValues, string> {
  return {
    required: {
      value: true,
      message: "Please enter your email",
    },
    pattern: {
      value:
        /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/,
      message: "Please enter a valid email",
    },
  };
}

export function passwordValidationOptions(): RegisterOptions<
  FieldValues,
  string
> {
  return {
    required: { value: true, message: "Please enter your password" },
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  };
}

export function requiredFieldsOptions(
  message: string,
): RegisterOptions<FieldValues, string> {
  return { required: { value: true, message: message } };
}

export function phoneNumberValidationOptions(): RegisterOptions<
  FieldValues,
  string
> {
  return {
    required: { value: true, message: "Please enter a phone number" },
    pattern: { value: /^\+\d+$/, message: "Please enter a valid phone number" },
  };
}

export function nonNegativeNumberOptions() {
  return {
    required: { value: true, message: "Please enter a number" },
    min: { value: 1, message: "Must be greater than zero" },
  };
}
