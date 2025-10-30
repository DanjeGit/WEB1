const products = [
  { id: "p001", name: "Author Touch", brand: "WriteStyle", desc: "Sleek and modern author-inspired footwear.", url: "images/author-item.jpg", price: 1300, stock: 18 },
  { id: "p002", name: "Bold Vision", brand: "Cardio", desc: "Classic comfort reimagined for all-day wear.", url: "images/card-image1.jpg", price: 1400, stock: 20 },
  { id: "p003", name: "Urban Flow", brand: "StepRight", desc: "Dynamic sneakers designed for comfort and motion.", url: "images/card-image3.jpg", price: 1450, stock: 15 },
  { id: "p004", name: "Trail Motion", brand: "PeakFit", desc: "Engineered for grip and durability in every stride.", url: "images/card-image5.jpg", price: 1550, stock: 10 },
  { id: "p005", name: "Active Edge", brand: "Velocity", desc: "Lightweight design for daily training sessions.", url: "images/card-image6.jpg", price: 1200, stock: 25 },

  { id: "p006", name: "Card Classic 1", brand: "CardLine", desc: "Timeless shoes for every season.", url: "images/card-item2.jpg", price: 1350, stock: 12 },
  { id: "p007", name: "Card Classic 2", brand: "CardLine", desc: "Soft comfort meets durable design.", url: "images/card-item4.jpg", price: 1400, stock: 9 },
  { id: "p008", name: "Card Classic 3", brand: "CardLine", desc: "Everyday essentials for your wardrobe.", url: "images/card-item5.jpg", price: 1250, stock: 14 },
  { id: "p009", name: "Card Classic 4", brand: "CardLine", desc: "Modern details, crafted with care.", url: "images/card-item6.jpg", price: 1450, stock: 11 },
  { id: "p010", name: "Card Classic 5", brand: "CardLine", desc: "Versatile sneakers for any outfit.", url: "images/card-item7.jpg", price: 1300, stock: 16 },
  { id: "p011", name: "Card Classic 6", brand: "CardLine", desc: "Signature style meets long-lasting comfort.", url: "images/card-item8.jpg", price: 1500, stock: 10 },
  { id: "p012", name: "Card Classic 7", brand: "CardLine", desc: "Lightweight performance footwear.", url: "images/card-item9.jpg", price: 1350, stock: 20 },
  { id: "p013", name: "Card Classic 8", brand: "CardLine", desc: "Smooth finish with adaptive fit.", url: "images/card-item10.jpg", price: 1550, stock: 18 },

  { id: "p014", name: "Card Large Prime", brand: "Victory", desc: "Premium large-format shoe with comfort tech.", url: "images/card-large-item1.jpg", price: 1600, stock: 9 },
  { id: "p015", name: "Card Large Move", brand: "Victory", desc: "Built for superior comfort and flexibility.", url: "images/card-large-item3.jpg", price: 1650, stock: 8 },
  { id: "p016", name: "Card Large Drive", brand: "Victory", desc: "Designed for performance and endurance.", url: "images/card-large-item5.jpg", price: 1700, stock: 6 },
  { id: "p017", name: "Card Large Rise", brand: "Victory", desc: "A new level of athletic design.", url: "images/card-large-item6.jpg", price: 1750, stock: 7 },
  { id: "p018", name: "Card Large Glide", brand: "Victory", desc: "Streamlined look with adaptive support.", url: "images/card-large-item8.jpg", price: 1800, stock: 5 },
  { id: "p019", name: "Card Large Sprint", brand: "Victory", desc: "Speed-oriented shoes with breathable mesh.", url: "images/card-large-item10.jpg", price: 1900, stock: 4 },
  { id: "p020", name: "Card Large Zenith", brand: "Victory", desc: "Top-tier comfort and premium material blend.", url: "images/card-large-item11.jpg", price: 2000, stock: 3 },

  { id: "p021", name: "Collector’s Choice", brand: "Legacy", desc: "Stylish limited-edition piece.", url: "images/collection-item4.jpg", price: 2100, stock: 2 },

  { id: "p022", name: "Post Runner", brand: "StreetX", desc: "Aesthetic and agility for the modern runner.", url: "images/post-item1.jpg", price: 1600, stock: 15 },
  { id: "p023", name: "Post Breeze", brand: "StreetX", desc: "Relaxed comfort and sleek look.", url: "images/post-item2.jpg", price: 1450, stock: 14 },
  { id: "p024", name: "Post Motion", brand: "StreetX", desc: "Smooth strides for your daily hustle.", url: "images/post-item3.jpg", price: 1500, stock: 12 },
  { id: "p025", name: "Post Pulse", brand: "StreetX", desc: "Light and breathable for long days.", url: "images/post-item7.jpg", price: 1600, stock: 10 },

  { id: "p026", name: "Post Image Alpha", brand: "UrbanEdge", desc: "Photogenic shoes that stand out anywhere.", url: "images/post-thumb-image1.jpg", price: 1550, stock: 8 },
  { id: "p027", name: "Post Image Beta", brand: "UrbanEdge", desc: "Every step is a statement of design.", url: "images/post-thumb-image2.jpg", price: 1600, stock: 9 },
  { id: "p028", name: "Post Image Gamma", brand: "UrbanEdge", desc: "Unique construction for street-ready performance.", url: "images/post-thumb-image3.jpg", price: 1650, stock: 6 },

  { id: "p029", name: "Single Post Elite", brand: "SoloFit", desc: "Elegant minimalism with a bold touch.", url: "images/single-post-item.jpg", price: 1750, stock: 7 },
  { id: "p030", name: "Product Prime", brand: "SoloFit", desc: "Sophisticated sneakers for everyday comfort.", url: "images/single-product-thumb1.jpg", price: 1800, stock: 10 },
  { id: "p031", name: "Product Supreme", brand: "SoloFit", desc: "Premium finish, crafted to perfection.", url: "images/single-product-thumb2.jpg", price: 1900, stock: 6 },
];

const featuredCollections = [
  { id: "f001", name: "Victory Glide", brand: "Victory", desc: "Lightweight comfort for your daily adventures.", url: "images/card-large-item8.jpg", price: 1800, stock: 5 },
  { id: "f002", name: "Urban Motion", brand: "StreetX", desc: "Where design meets effortless movement.", url: "images/post-item3.jpg", price: 1500, stock: 12 },
  { id: "f003", name: "Prestige Prime", brand: "SoloFit", desc: "Timeless luxury and next-level performance.", url: "images/single-product-thumb2.jpg", price: 1900, stock: 6 },
];
