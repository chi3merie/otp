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
  "Antibiotics",
  "Allergy",
  "Diabetes",
  "Digestive",
  "Immunity",
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

const capsuleImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
  <defs>
    <linearGradient id="bg" x1="0" x2="1">
      <stop offset="0%" stop-color="#eefaf4"/>
      <stop offset="100%" stop-color="#dfeee7"/>
    </linearGradient>
    <linearGradient id="capsule" x1="0" x2="1">
      <stop offset="0%" stop-color="#4ec985"/>
      <stop offset="100%" stop-color="#0f8f63"/>
    </linearGradient>
  </defs>
  <rect width="900" height="700" fill="url(#bg)"/>
  <g transform="translate(110 120)">
    <g transform="translate(50 50) rotate(-14 120 120)">
      <rect x="0" y="30" width="220" height="150" rx="75" fill="url(#capsule)"/>
      <rect x="60" y="0" width="100" height="210" rx="50" fill="#d9f5e8" opacity="0.75"/>
      <rect x="30" y="70" width="160" height="60" rx="30" fill="#effaf4" opacity="0.65"/>
      <text x="110" y="110" font-size="34" text-anchor="middle" fill="#0d5d42" font-family="Arial, Helvetica, sans-serif" font-weight="700">C</text>
    </g>
    <g transform="translate(285 180) rotate(16 130 90)">
      <rect x="0" y="0" width="260" height="180" rx="90" fill="#f4c857"/>
      <rect x="70" y="40" width="120" height="100" rx="50" fill="#fff5d4" opacity="0.7"/>
      <text x="130" y="106" font-size="42" text-anchor="middle" fill="#7a5601" font-family="Arial, Helvetica, sans-serif" font-weight="700">+</text>
    </g>
    <g transform="translate(500 40) rotate(-10 110 110)">
      <rect x="0" y="30" width="220" height="150" rx="75" fill="#f1f4ff" stroke="#8ea6d6" stroke-width="8"/>
      <rect x="82" y="0" width="58" height="210" rx="26" fill="#9bb4ea"/>
      <text x="110" y="113" font-size="30" text-anchor="middle" fill="#2d4a7a" font-family="Arial, Helvetica, sans-serif" font-weight="700">RX</text>
    </g>
  </g>
</svg>
`)}`;

export const products: Product[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    description: "Fast relief from fever, headaches, and mild to moderate pain.",
    price: 4.99,
    badge: "Popular",
    image: "/images/products/paracetamol.png",
  },
  {
    id: 2,
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    description: "Anti-inflammatory capsules for pain, fever, and swelling.",
    price: 6.49,
    badge: "New",
    image: "/images/products/ibuprofen.jpeg",
  },
  {
    id: 3,
    name: "Aspirin 81mg",
    category: "Pain Relief",
    description: "Low-dose enteric-coated tablets for pain and heart health.",
    price: 3.79,
    badge: "Top rated",
    image: "/images/products/aspirin.webp",
  },
  {
    id: 4,
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    description: "Broad-spectrum antibiotic for bacterial infections. Prescription required.",
    price: 12.5,
    badge: "Rx only",
    image: "/images/products/amoxicillin.jpg",
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    category: "Allergy",
    description: "Once-daily antihistamine for hay fever and allergy relief.",
    price: 8.99,
    badge: "Best seller",
    image: "/images/products/cetirizine.jpg",
  },
  {
    id: 6,
    name: "Metformin 500mg",
    category: "Diabetes",
    description: "First-line oral tablets for type 2 blood sugar control.",
    price: 9.75,
    badge: "Doctor trusted",
    image: "/images/products/metformin.jpg",
  },

  
  {
    id: 7,
    name: "Omeprazole 20mg",
    category: "Digestive",
    description: "Acid reducer capsules for heartburn, reflux, and stomach comfort.",
    price: 11.25,
    badge: "Care pick",
    image: "/images/products/med_omeprazole.jpg",
  },
  {
    id: 8,
    name: "Vitamin C 1000mg",
    category: "Immunity",
    description: "Daily antioxidant tablets to support immune function.",
    price: 7.99,
    badge: "Gentle",
    image: "/images/products/med_vitaminc.webp",
  },
  {
    id: 9,
    name:"COLOUR ME RED",
    category:"FRAGRANCES",
    description:"Color Me Red is lururious and long-lasting fragrance",
    price: 40,
    badge:"spray",
    image:"/images/products/color me red 2.jpg",
  },
  {
    id: 10,
    name:"EKAM OILS",
    category:"FRAGRANCES",
    description:"Good Nature Brand",
    price: 30,
    badge:"SPRAY",
    image:"/images/products/EKAM.jpg",
  },
  {
    id :11,
    name:"Veda oils",
    category:"FRAGRANCES AND OIL",
    description:"Good nature Brand",
    price: 20,
    badge:"SPRAY",
    image:"/images/products/VEDA OILS.jpg",

  },
  {
   id: 12,
   name:"JOJOBA OIL",
   category:"oil and FRAGRANCES",
   description:"good for the skin",
   price: 20,
   badge:"oil",
   image:"/images/products/jojoba.jpg",
  }
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
