export const validateEmail = (
  email: string,
): { isValid: boolean; error: string } => {
  // Remove whitespace
  const trimmedEmail = email.trim();

  // Check if empty
  if (!trimmedEmail) {
    return { isValid: false, error: "Email is required" };
  }

  // Basic format validation (RFC 5322 compliant)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Check length (email shouldn't be too long)
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: "Email address is too long" };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes("..")) {
    return { isValid: false, error: "Email cannot contain consecutive dots" };
  }

  // Check if starts or ends with dot
  if (trimmedEmail.startsWith(".") || trimmedEmail.endsWith(".")) {
    return { isValid: false, error: "Email cannot start or end with a dot" };
  }

  // Check local part length (before @)
  const [localPart, domainPart] = trimmedEmail.split("@");

  if (localPart.length > 64) {
    return { isValid: false, error: "Email username is too long" };
  }

  // Check domain part
  if (!domainPart || domainPart.length < 1) {
    return { isValid: false, error: "Invalid email domain" };
  }

  // Check for valid domain format
  const domainRegex =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!domainRegex.test(domainPart)) {
    return { isValid: false, error: "Invalid email domain format" };
  }

  // All checks passed
  return { isValid: true, error: "" };
};
