import { Expert } from "./expert";

export interface Booking {
  _id: string;

  expertName: string;

  clientEmail: string;

  date: string;

  timeSlot: string;

  createdAt: string;

  status: string;

  email?: string;

  userName?: string;

  notes?: string;

  expertImage?: string;

  expert?: Expert;
}