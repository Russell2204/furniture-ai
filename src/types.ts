/**
 * Types definition for "Мебель от Руслана"
 */

export interface ProductCallout {
  label: string;
  x: number; // percentage from left, e.g. 35
  y: number; // percentage from top, e.g. 40
}

export interface Product {
  id: string;
  name: string;
  russianName: string;
  description: string;
  russianDescription: string;
  category: string;
  russianCategory: string;
  price: number;
  imageUrl: string;
  callouts?: ProductCallout[]; // markers for interactive SVG lines matching the visual theme
  specs: {
    label: string;
    value: string;
  }[];
  isCustomService?: boolean; // Is it a bespoke service or physical product
  features: string[]; // List of core premium traits
}

export interface ClientRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  furnitureInterest: string; // which product or custom design
  notes: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface PRDSection {
  title: string;
  anchor: string;
  content: string;
}
