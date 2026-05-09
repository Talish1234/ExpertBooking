const VITE_BASE_URL: string = "https://expertbooking.onrender.com";

export const API_BASE: string = `${VITE_BASE_URL}/api`;
export const SOCKET_URL: string = VITE_BASE_URL;

export const CATEGORIES: string[] = [
  "All",
  "Technology",
  "Finance",
  "Health",
  "Legal",
  "Marketing",
  "Design",
  "Business",
  "Education",
];

export interface CategoryColors {
  [key: string]: string;
}

export const CATEGORY_COLORS: CategoryColors = {
  Technology: "#6366f1",
  Finance: "#10b981",
  Health: "#f43f5e",
  Legal: "#f59e0b",
  Marketing: "#ec4899",
  Design: "#8b5cf6",
  Business: "#0ea5e9",
  Education: "#14b8a6",
};