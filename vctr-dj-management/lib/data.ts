export const WA_NUMBER = "6281234567890"; // TODO: ganti dengan nomor WhatsApp bisnis asli

export type Dj = {
  id: string;
  name: string;
  genre: string;
  city: string;
  bio: string;
  track: string; // SoundCloud track API URL used for the embed
};

export const DJS: Dj[] = [
  {
    id: "dj-vega",
    name: "DJ Vega",
    genre: "Progressive House / EDM",
    city: "Jakarta",
    bio: "10+ tahun membangun energi dance floor di klub dan festival besar se-Asia Tenggara. Dikenal lewat transisi mulus dan build-up yang presisi.",
    track: "https://api.soundcloud.com/tracks/293",
  },
  {
    id: "mc-ryu",
    name: "MC Ryu",
    genre: "Hip-Hop / Open Format",
    city: "Bandung",
    bio: "Spesialis open format untuk private party & corporate event — membaca crowd dan menjaga momentum sepanjang malam.",
    track: "https://api.soundcloud.com/tracks/293",
  },
  {
    id: "dj-lira",
    name: "DJ Lira",
    genre: "Melodic Techno",
    city: "Bali",
    bio: "Suara khas melodic techno dengan sentuhan atmosferik, reguler tampil di rooftop dan beach club di Bali.",
    track: "https://api.soundcloud.com/tracks/293",
  },
  {
    id: "dj-kaze",
    name: "DJ Kaze",
    genre: "Funky / Disco House",
    city: "Surabaya",
    bio: "Membawa nuansa funky disco ke acara pernikahan dan gala dinner dengan pembacaan crowd yang tajam.",
    track: "https://api.soundcloud.com/tracks/293",
  },
];

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  spec: string;
  price: number;
  qty: string;
};

export const EQUIPMENT: EquipmentItem[] = [
  { id: "cdj3000", name: "Pioneer CDJ-3000", category: "Player", spec: '9" touchscreen · Beat Sync · USB/SD', price: 850000, qty: "per unit" },
  { id: "djm900", name: "Pioneer DJM-900NXS2", category: "Mixer", spec: "4-channel · Sound Color FX · Booth EQ", price: 700000, qty: "per unit" },
  { id: "ddj1000", name: "Pioneer DDJ-1000", category: "Controller", spec: "4-channel controller · rekordbox ready", price: 600000, qty: "per unit" },
  { id: "linesub", name: "Line Array + Subwoofer 2x", category: "Sound System", spec: "Cocok untuk 200–500 pax", price: 2500000, qty: "per set" },
  { id: "movinghead", name: "Moving Head Light 8x", category: "Lighting", spec: "RGBW · DMX controllable", price: 1200000, qty: "per set" },
  { id: "fogsmoke", name: "Fog Machine + Haze", category: "Efek", spec: "1500W · DMX ready", price: 350000, qty: "per unit" },
];

export const PORTFOLIO = [
  { title: "Sunset Beach Festival", tag: "Festival · 3.000 pax", from: "#FF2E88", to: "#8B5CF6" },
  { title: "Rooftop NYE Countdown", tag: "Rooftop Club · 600 pax", from: "#8B5CF6", to: "#22F0D8" },
  { title: "Wedding Reception — A&S", tag: "Private Event · 400 pax", from: "#22F0D8", to: "#FF2E88" },
  { title: "Corporate Launch Night", tag: "Brand Activation · 250 pax", from: "#FF2E88", to: "#22F0D8" },
  { title: "Warehouse Rave Vol. 4", tag: "Underground · 800 pax", from: "#8B5CF6", to: "#FF2E88" },
  { title: "Campus Fest Anniversary", tag: "Kampus · 1.200 pax", from: "#22F0D8", to: "#8B5CF6" },
];

export const DURATIONS = ["2 Jam", "4 Jam", "Full Day (8 Jam)", "Custom / Multi-hari"];

export const fmtIDR = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
