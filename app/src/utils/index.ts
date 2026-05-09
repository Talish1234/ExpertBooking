import { CATEGORY_COLORS } from "../config";

export interface BookingForm {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
}

export interface BookingFormErrors {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  date?: string;
  timeSlot?: string;
}

export function formatDate(str: string): string {
  return new Date(str + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string = ""): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "#6366f1";
}

export function validateBookingForm(
  form: BookingForm
): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!form.clientName.trim()) {
    errors.clientName = "Name is required";
  }

  if (!form.clientEmail.match(/^\S+@\S+\.\S+$/)) {
    errors.clientEmail = "Valid email required";
  }

  if (!form.clientPhone.match(/^\+?[\d\s\-()\\.]{7,15}$/)) {
    errors.clientPhone = "Valid phone required";
  }

  if (!form.date) {
    errors.date = "Date is required";
  }

  if (!form.timeSlot) {
    errors.timeSlot = "Time slot is required";
  }

  return errors;
}