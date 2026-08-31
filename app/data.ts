export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  badge: string;
  image: string;
};

export type Promo = {
  title: string;
  detail: string;
};

export type Testimonial = {
  name: string;
  quote: string;
};

export const categories = [
  "All",
  "Pain Relief",
  "Immunity",
  "Wellness",
  "Skin Care",
  "Family Care",
];

export const services = [
  "Same-day delivery",
  "Prescription pickup",
  "Nurse consultations",
  "Health screenings",
];

export const promos: Promo[] = [
  {
    title: "Free delivery on orders over $60",
    detail: "Neighborhood delivery with tracked arrival windows and pharmacist updates.",
  },
  {
    title: "Quarterly wellness check",
    detail: "Get curated vitamin bundles and medication reviews from our care team.",
  },
  {
    title: "Care plan members save 15%",
    detail: "Lower costs on everyday essentials with a recurring refill plan.",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Daily Vitamin D3",
    category: "Wellness",
    description: "Immune support and bone health supplement for daily routines.",
    price: 18.5,
    badge: "Popular",
    image: "/images/products/_t_picsum_id10.jpg",
  },
  {
    id: 2,
    name: "Cold Relief Capsules",
    category: "Pain Relief",
    description: "Fast-acting symptom relief for colds, headaches, and congestion.",
    price: 14.99,
    badge: "New",
    image: "/images/products/_t_picsum_id20.jpg",
  },
  {
    id: 3,
    name: "Hydrating Serum",
    category: "Skin Care",
    description: "Barrier-supporting moisturizer with ceramides and aloe.",
    price: 26.0,
    badge: "Top rated",
    image: "/images/products/_t_picsum_id1084.jpg",
  },
  {
    id: 4,
    name: "Kids Multi-Vitamin",
    category: "Family Care",
    description: "Child-friendly vitamins designed for growing bodies and routines.",
    price: 21.75,
    badge: "Doctor trusted",
    image: "/images/products/_t_pexels.jpg",
  },
  {
    id: 5,
    name: "Immune Defense Gummies",
    category: "Immunity",
    description: "Daily immune support with zinc and elderberry for busy schedules.",
    price: 24.5,
    badge: "Best seller",
    image: "/images/products/_t_picsum_id10.jpg",
  },
  {
    id: 6,
    name: "Joint & Mobility Support",
    category: "Pain Relief",
    description: "Glucosamine and turmeric blend for comfort and recovery support.",
    price: 29.0,
    badge: "Wellness",
    image: "/images/products/_t_picsum_id20.jpg",
  },
  {
    id: 7,
    name: "Gentle Baby Lotion",
    category: "Family Care",
    description: "Ultra-mild lotion to keep delicate skin soft and nourished.",
    price: 16.25,
    badge: "Gentle",
    image: "/images/products/_t_pexels.jpg",
  },
  {
    id: 8,
    name: "Cleansing Renewal Oil",
    category: "Skin Care",
    description: "Daily facial oil for a balanced glow and skin comfort.",
    price: 31.5,
    badge: "Care pick",
    image: "/images/products/_t_picsum_id1084.jpg",
  },
];

export const careSteps = [
  "Share your prescription, allergies, or refill goals in a quick form.",
  "Our pharmacist verifies the order and checks for overlaps or timing issues.",
  "Choose home delivery, curbside pickup, or an in-store pharmacist consult.",
  "Track orders and get follow-up support without leaving the pharmacy queue.",
];

export const testimonials: Testimonial[] = [
  {
    name: "Amina K.",
    quote: "The refill reminders and same-day delivery made managing my routine easy.",
  },
  {
    name: "Daniel P.",
    quote: "I finally found a pharmacy that feels personal and genuinely helpful.",
  },
  {
    name: "Hope E.",
    quote: "Their care team explained every medication note without rushing me.",
  },
  {
    name: "Tunde B.",
    quote: "Pickup was fast, the staff was kind, and the product recommendations were spot on.",
  },
];
