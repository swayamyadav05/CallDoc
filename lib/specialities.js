import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  BrainCircuit,
  CircleDot,
  Droplets,
  Eye,
  Flower,
  GraduationCap,
  HeartPlus,
  HeartPulse,
  Microscope,
  ScanHeart,
  Scissors,
  ScissorsLineDashed,
  Stethoscope,
  Syringe,
  Thermometer,
} from "lucide-react";

export const SPECIALITIES = [
  {
    name: "Cardiology",
    icon: <HeartPulse className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Dermatology",
    icon: <CircleDot className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Emergency Medicine",
    icon: <Stethoscope className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Endocrinology",
    icon: <Activity className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Gastroenterology",
    icon: <Thermometer className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Neurology",
    icon: <Brain className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Obstetrics and Gynecology",
    icon: <Flower className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Ophthalmology",
    icon: <Eye className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Orthopedics",
    icon: <Bone className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Pediatrics",
    icon: <Baby className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Psychiatry",
    icon: <BrainCircuit className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Radiology",
    icon: <ScanHeart className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Surgery",
    icon: <ScissorsLineDashed className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Urology",
    icon: <Droplets className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Anesthesiology",
    icon: <Syringe className="h-5 w-5 text-emerald-400" />,
  },
  {
    name: "Others",
    icon: <Microscope className="h-5 w-5 text-emerald-400" />,
  },
];
