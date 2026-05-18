/* Configuration file for our cupcake shop */

/* Google Analytics and Ads tracking configuration */
const TRACKING_CONFIG = {
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-QJC1ND04KX",
  ADS_ID: import.meta.env.VITE_ADS_ID || "AW-18083128218",
  // You can add conversion labels here later
  CONVERSION_LABELS: {
    // PURCHASE: "AW-18083128218/AbC-XYZ_123",
    // LEAD: "AW-18083128218/LeadLabel_456",
  }
};

/* Our packs */
import classicPack6 from "../gallery/classic_24.jpeg";
import floralpack4 from "../gallery/midnight4x4.jpeg";
import floralPack6 from "../gallery/pack_of_6.jpeg";
import floralPack12 from "../gallery/midnight_packof12.jpeg";
import floralPack24 from "../gallery/baby_shower24.jpeg";
import bouqet22Pack from "../gallery/bouquet22.jpeg";
import cake_tulip from "../gallery/cake_tulip.jpeg";
import cake_rose from "../gallery/cake_white_redrose.jpeg";
import full_rooftop from "../assets/full_rooftop.jpeg";
import wreath from "../assets/wreath.jpeg";
import mini_rooftop from "../assets/mini_rooftop.jpeg";
import full_covered from "../gallery/cake_tulip.jpeg";
import { label } from "framer-motion/client";

const CUPCAKE_FLAVOURS = [
  { label: "Vanilla", extra: 0 },
  { label: "Chocolate", extra: 0 },
  { label: "Red Velvet", extra: 0 },
];

const CAKE_FLAVOURSS = [
  { label: "vanilla", extra: 0 },
  { label: "chocolate", extra: 0 },
  { label: "red velvet", extra: 0 },
  { label: "lemon", extra: 5 },
  { label: "carrot", extra: 5 },
];

const CAKE_FILLINGS = [
  { label: "No filling", extra: 0 },
  { label: "chocolate hazelnut", extra: 6 },
  { label: "cream cheese", extra: 6 },
  { label: "strawberry", extra: 6 },
  { label: "blueberry", extra: 6 },
  { label: "pineapple", extra: 6}
];

const CAKE_DIAMETER = [
  {label:"4 inch", extra:0},
  {label:"6 inch", extra:30},
  {label:"8 inch", extra:50},
];

const PRODUCTS = [
  { 
    id: "floral", 
    title: "Floral Cupcakes", 
    packSizes: [
      { name: "4 Pack", price: 20, img: floralpack4 },
      { name: "6 Pack", price: 30, img: floralPack6 },
      { name: "12 Pack", price: 60, img: floralPack12 },
      { name: "24 Pack", price: 120, img: floralPack24 }
    ],
    flavours: CUPCAKE_FLAVOURS
  },
  { 
    id: "floralcakes", 
    title: "Floral Cakes", 
    packSizes: [
      { name: "Mini rooftop", price: 70, img: mini_rooftop},
      { name: "Full rooftop", price: 120, img: full_rooftop},
      { name: "Full wreath", price: 135, img: wreath },
      { name: "Full covered", price: 240, img: full_covered },
    ],
    flavours: CAKE_FLAVOURSS,
    fillings: CAKE_FILLINGS,
    diameters: CAKE_DIAMETER
  },
  // { 
  //   id: "vintagecakes", 
  //   title: "Vintage Cakes", 
  //   packSizes: [
  //     { name: "Single colour cakes", price: 55, img: cake_rose},
  //     { name: "2 colour cakes", price: 58, img: cake_tulip},
  //     { name: "3 colour cakes", price: 61, img: cake_tulip },
  //   ],
  //   flavours: CAKE_FLAVOURSS,
  //   fillings: CAKE_FILLINGS,
  //   diameters: CAKE_DIAMETER
  // },
  { 
    id: "bouquet", 
    title: "Cupcake Bouquet", 
    packSizes: [
      { name: "7 Pack", price: 50, img: bouqet22Pack },
      { name: "12 Pack", price: 100, img: bouqet22Pack },
      { name: "14 Pack", price: 120, img: bouqet22Pack },
      { name: "19 Pack", price: 200, img: bouqet22Pack },
      { name: "24 Pack", price: 250, img: bouqet22Pack },
      { name: "30 Pack", price: 350, img: bouqet22Pack },
      { name: "40 Pack", price: 510, img: bouqet22Pack },
    ],
    flavours: CUPCAKE_FLAVOURS
  },
  { 
    id: "classic", 
    title: "Classic Cupcakes", 
    packSizes: [
      { name: "4 Pack", price: 15, img: classicPack6 },
      { name: "6 Pack", price: 20, img: classicPack6 },
      { name: "12 Pack", price: 36, img: classicPack6 },
      { name: "24 Pack", price: 72, img: classicPack6 }
    ],
    flavours: CUPCAKE_FLAVOURS
  }
];

/* Our reviews */
const reviews = [
  {
    name: "Sueda M.",
    text: "The Cupcakes look so beautiful I almost didn’t want to eat them.",
  },
  {
    name: "James K.",
    text: "Ordered for a birthday — everyone loved them!",
  },
  {
    name: "Emily R.",
    text: "So cute and tasty. You can tell they’re made with love 🧁",
  },
];


const contactInfo = [
  {
    type: "instagram",
    title: "Instagram",
    value: "@bloomscupcakes.ca",
    link: "https://www.instagram.com/bloomscupcakes.ca",
    external: true,
  },
  {
    type: "email",
    title: "Email",
    value: "bloomscupcakes@gmail.com",
    link: "mailto:bloomscupcakes@gmail.com",
  },
  {
    type: "phone",
    title: "Phone",
    value: "(343) 987-9593",
    link: "tel:3439879593",
  },
];

export { TRACKING_CONFIG, PRODUCTS, reviews, contactInfo };
