export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
  tag?: string;
  location?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  weddingDate: string; // e.g. "18 October 2026"
  weddingDateIso: string; // "2026-10-18T19:00:00"
  weddingDay: string; // "Sunday"
  weddingTime: string; // "7:00 PM"
  venue: string; // "The Grand Palace, New Delhi"
  venueAddress: string;
  tagline: string;
  heroPhotos: PhotoItem[];
  gallery360Photos: PhotoItem[];
  whatsapp: string;
  phone: string;
  email: string;
  studioName: string;
}

export interface TrailPhoto {
  id: string;
  photo: PhotoItem;
  x: number;
  y: number;
  size: number;
  rotation: number;
  blur: number;
  scale: number;
  opacity: number;
  createdAt: number;
  vx: number;
  vy: number;
}

export interface RSVPData {
  guestName: string;
  email: string;
  phone: string;
  attendance: 'attending' | 'declined';
  plusOnes: number;
  dietary: string;
  songRequest: string;
  message: string;
  submittedAt?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
}
