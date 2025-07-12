export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern Ecommerce Store built with Next.js and Tailwind CSS";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const SIGN_IN_DEFAULTS = {
  email: "",
  password: "",
};

export const SIGN_UP_DEFAULTS = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
