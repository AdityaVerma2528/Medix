import {
    ShieldCheck,
    Pill,
    FileUp,
    UserRound,
    Truck,
    PackageSearch,
    BadgeCheck,
    FolderHeart,
    Wallet,
    Clock,
    HeartPulse,
    Star,
  } from "lucide-react";
  
  export const stats = [
    { value: "482K+", label: "Patients served", code: "PT-482091" },
    { value: "1.9M+", label: "Orders delivered", code: "RX-190224" },
    { value: "3,400+", label: "Licensed pharmacists", code: "PH-003412" },
    { value: "760+", label: "Verified pharmacies", code: "VP-000761" },
  ];
  
  export const features = [
    {
      icon: ShieldCheck,
      title: "Secure login",
      description: "Bank-grade encryption and two-factor verification protect every session.",
    },
    {
      icon: Pill,
      title: "Medicine ordering",
      description: "Search, compare, and order from verified pharmacies in a few taps.",
    },
    {
      icon: FileUp,
      title: "Upload prescription",
      description: "Scan or photograph a prescription and a pharmacist reviews it directly.",
    },
    {
      icon: UserRound,
      title: "Patient profile",
      description: "Keep allergies, conditions, and dosage history in one private record.",
    },
    {
      icon: Truck,
      title: "Fast delivery",
      description: "Same-day delivery in most cities, with temperature-controlled handling.",
    },
    {
      icon: PackageSearch,
      title: "Order tracking",
      description: "Follow each order from pharmacy shelf to your door in real time.",
    },
    {
      icon: BadgeCheck,
      title: "Verified pharmacies",
      description: "Every partner pharmacy is licensed and audited before it joins Vitalis.",
    },
    {
      icon: FolderHeart,
      title: "Health records",
      description: "Store lab reports and prescriptions, and share them with one link.",
    },
  ];
  
  export const steps = [
    {
      title: "Create account",
      description: "Sign up in under a minute with just your phone number and email.",
    },
    {
      title: "Add patient details",
      description: "Enter allergies, conditions, and preferred pharmacy once — reuse them forever.",
    },
    {
      title: "Upload prescription or search medicine",
      description: "Snap a photo of your prescription, or search your medicine by name.",
    },
    {
      title: "Get medicines delivered",
      description: "Track your order live as it moves from pharmacy to your doorstep.",
    },
  ];
  
  export const whyChooseUs = [
    { icon: ShieldCheck, title: "Secure platform", description: "Your data is encrypted end-to-end, always." },
    { icon: Truck, title: "Fast delivery", description: "Most orders arrive the same day, in every major city." },
    { icon: BadgeCheck, title: "Trusted pharmacies", description: "Only licensed, audited pharmacies fulfill orders." },
    { icon: Wallet, title: "Affordable prices", description: "Transparent pricing with no hidden delivery fees." },
    { icon: Clock, title: "24/7 support", description: "A real pharmacist is one message away, day or night." },
    { icon: HeartPulse, title: "Genuine medicines", description: "Every batch is verified against manufacturer records." },
  ];
  
  export const testimonials = [
    {
      name: "Ananya Rao",
      role: "Patient since 2023",
      rating: 5,
      review:
        "I uploaded my mother's prescription at midnight and it was confirmed by a pharmacist within the hour. Delivery came before 9am.",
    },
    {
      name: "David Okoro",
      role: "Patient since 2022",
      rating: 5,
      review:
        "The order tracking is oddly satisfying — I can see exactly which pharmacy is preparing my refill and when it leaves.",
    },
    {
      name: "Priya Menon",
      role: "Caregiver",
      rating: 5,
      review:
        "Managing my father's medication schedule used to be three different apps. Now it's one profile and one delivery window.",
    },
    {
      name: "Marcus Webb",
      role: "Patient since 2024",
      rating: 4,
      review:
        "Consulting a pharmacist before switching brands saved me a pointless trip to the clinic. Genuinely useful, not just convenient.",
    },
    {
      name: "Sara Lindqvist",
      role: "Patient since 2023",
      rating: 5,
      review:
        "The health records section means I stopped carrying a folder of old lab reports to every appointment.",
    },
    {
      name: "Kabir Anand",
      role: "Patient since 2021",
      rating: 5,
      review:
        "Three years, zero missed refills. The reminders and tracking just quietly work in the background.",
    },
  ];
  
  export const faqs = [
    {
      question: "Is my prescription reviewed by a real pharmacist?",
      answer:
        "Yes. Every uploaded prescription is reviewed by a licensed pharmacist before an order is confirmed, not by an algorithm alone.",
    },
    {
      question: "How fast is delivery?",
      answer:
        "Most orders in serviceable cities arrive the same day. You'll see an estimated window before you check out, and live tracking after.",
    },
    {
      question: "Are the pharmacies on Vitalis verified?",
      answer:
        "Every partner pharmacy is licensed, audited, and re-verified periodically. Unverified sellers are never listed on the platform.",
    },
    {
      question: "Can I manage medicines for a family member?",
      answer:
        "Yes. You can create linked patient profiles for family members and manage their prescriptions and orders from your account.",
    },
    {
      question: "Is my health data private?",
      answer:
        "Your records are encrypted end-to-end and are never sold or shared with third parties without your explicit consent.",
    },
    {
      question: "What if I need to speak with someone urgently?",
      answer:
        "Pharmacist consultation is available 24/7 through in-app chat, with response times typically under two minutes.",
    },
  ];
  
  export const StarIcon = Star;