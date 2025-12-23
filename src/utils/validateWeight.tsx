import { validationResult } from "@/types/ValidationResult";

export const validateWeight = (weight: string): validationResult => {
  const num = parseFloat(weight);

  if (!weight || weight.trim() === "") {
    return { isValid: false, error: "Weight is required" };
  }

  if (isNaN(num)) {
    return { isValid: false, error: "Weight must be a number" };
  }

  if (num <= 0) {
    return { isValid: false, error: "Weight must be positive" };
  }

  if (num < 20) {
    return { isValid: false, error: "Weight seems too low (min 20 kg)" };
  }

  if (num > 500) {
    return { isValid: false, error: "Weight seems too high (max 500 kg)" };
  }

  return { isValid: true };
};
