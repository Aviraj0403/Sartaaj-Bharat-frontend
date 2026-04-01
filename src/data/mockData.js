export const categories = [
  { id: 1, name: "Modular Phones", slug: "modular-phones" },
  { id: 2, name: "Galaxy S", slug: "galaxy-s" },
  { id: 3, name: "Galaxy XCover", slug: "galaxy-xcover" },
  { id: 4, name: "Pixel Power", slug: "pixel-power" },
  { id: 5, name: "iPhone 11 Pro", slug: "iphone-11-pro" },
  { id: 6, name: "Motorola", slug: "motorola" },
  { id: 7, name: "Smart Phones", slug: "smart-phones" },
];

export const sliders = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2000&auto=format&fit=crop",
    title: "GALAXY S25 ULTRA",
    subtitle: "AI For All",
    description: "Experience the next level of mobile intelligence.",
    btnText: "Shop Now",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2000&auto=format&fit=crop",
    title: "IPHONE 16 PRO MAX",
    subtitle: "Titanium. So Strong. So Light.",
    description: "The most advanced iPhone ever created.",
    btnText: "Buy Now",
  },
];

export const products = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max (8GB RAM, 128GB)",
    slug: "iphone-14-pro-max",
    price: 1299.0,
    oldPrice: 1399.0,
    rating: 5,
    reviews: 124,
    brand: "Apple",
    reference: "demo_1",
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Premium+iPhone",
    images: [
      "https://via.placeholder.com/1000?text=iPhone+Pro+View+1",
      "https://via.placeholder.com/1000?text=iPhone+Pro+View+2",
    ],
    category: "modular-phones",
    description:
      "Pro camera system, A16 Bionic chip, and a leap in battery life.",
    details: {
      "Screen Size": "6.7 inches",
      Processor: "A16 Bionic",
      Camera: "48MP Main",
      Battery: "4323 mAh",
    },
    colors: [
      { name: "Deep Purple", hex: "#4E455A" },
      { name: "Gold", hex: "#F9E5C9" },
      { name: "Silver", hex: "#F0F2F2" },
      { name: "Space Black", hex: "#282829" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    isNew: true,
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra Cell Phone",
    slug: "samsung-galaxy-s25-ultra",
    price: 99.0,
    oldPrice: 105.0,
    rating: 4.5,
    reviews: 8,
    brand: "Studio Design",
    reference: "demo_2",
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Galaxy+S25",
    images: [
      "https://via.placeholder.com/1000?text=Galaxy+Ultra+1",
      "https://via.placeholder.com/1000?text=Galaxy+Ultra+2",
    ],
    category: "galaxy-s",
    description:
      "Samsung Galaxy S25 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage) | 200MP Camera",
    longDescription:
      "Meet the Galaxy S25 Ultra, equipped with the Galaxy's most powerful processor, a 200MP camera for epic nightography, and a built-in S Pen.",
    details: {
      Composition: "Ceramic",
      Styles: "Casual",
      Properties: "Maxi Dress",
    },
    colors: [
      { name: "Titanium Gray", hex: "#808080" },
      { name: "Titanium Black", hex: "#000000" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    isNew: true,
    isFeatured: true,
    isSpecial: true,
  },
  {
    id: 3,
    name: "Oppo Reno 10 Pro 5G",
    slug: "oppo-reno-10-pro",
    price: 499.0,
    oldPrice: 599.0,
    rating: 4,
    reviews: 45,
    brand: "Oppo",
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Reno+10+Pro",
    images: [
      "https://via.placeholder.com/600?text=Reno+Pro+View",
    ],
    category: "pixel-power",
    description: "Portrait expert with 100W SUPERVOOC flash charge.",
    colors: [{ name: "Silvery Grey", hex: "#C0C0C0" }],
    isBestseller: true,
  },
  {
    id: 4,
    name: "Vivo V40 5G Smartphone",
    slug: "vivo-v40-5g",
    price: 399.0,
    oldPrice: 450.0,
    rating: 4,
    reviews: 12,
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Vivo+V40",
    images: [
      "https://via.placeholder.com/600?text=Vivo+V40+View",
    ],
    category: "iphone-11-pro",
    isFeatured: true,
  },
  {
    id: 5,
    name: "OnePlus 12R 5G",
    slug: "oneplus-12r",
    price: 699.0,
    rating: 5,
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=OnePlus+12R",
    images: [
      "https://via.placeholder.com/600?text=OnePlus+12R+View",
    ],
    category: "smart-phones",
    isSpecial: true,
  },
  {
    id: 6,
    name: "Samsung Galaxy Z Fold 6",
    slug: "galaxy-z-fold-6",
    price: 1899.0,
    oldPrice: 1999.99,
    rating: 5,
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Z+Fold+6",
    images: [
      "https://via.placeholder.com/600?text=Z+Fold+6+View",
    ],
    category: "fold-friendly-gear",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 7,
    name: "Motorola Edge 50 Fusion",
    slug: "moto-edge-50",
    price: 350.0,
    rating: 3.5,
    availability: "Out of Stock",
    image:
      "https://via.placeholder.com/600?text=Moto+Edge+50", 
    images: [
      "https://via.placeholder.com/600?text=Moto+Edge+View",
    ],
    category: "motorola",
  },
  {
    id: 8,
    name: "Xiaomi Redmi 13 4+128GB",
    slug: "xiaomi-redmi-13",
    price: 199.0,
    rating: 4,
    availability: "In Stock",
    image:
      "https://via.placeholder.com/600?text=Redmi+13",
    images: [
      "https://via.placeholder.com/600?text=Redmi+13+View",
    ],
    category: "smart-phones",
  },
];
