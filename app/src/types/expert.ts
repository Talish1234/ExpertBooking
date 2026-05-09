export interface Expert {
  _id: string;

  name: string;

  category: string;

  bio: string;

  experience: number;

  hourlyRate: number;

  reviewCount: number;

  rating?: number;

  image?: string;

  availability?: string[];

  skills?: string[];

  createdAt?: string;

  updatedAt?: string;
}