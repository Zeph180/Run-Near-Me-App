import { validationResult } from "@/types/ValidationResult";

export const validateHeight = (height: string): validationResult => {
  const num = parseFloat(height);

  if (!height || height.trim() === "") {
    return { isValid: false, error: "Height is required" };
  }

  if (isNaN(num)) {
    return { isValid: false, error: "Height must be a number" };
  }

  if (num <= 0) {
    return { isValid: false, error: "Height must be positive" };
  }

  if (num < 50) {
    return { isValid: false, error: "Height seems too low (min 50 cm)" };
  }

  if (num > 272) {
    return { isValid: false, error: "Height seems too high (max 272 cm)" };
  }

  return { isValid: true, error: "" };
};
