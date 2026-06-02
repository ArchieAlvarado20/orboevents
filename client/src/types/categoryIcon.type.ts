import {
  PartyPopper,
  Music,
  Trophy,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Utensils,
  HeartPulse,
  Theater,
  Plane,
  FolderKanban,
} from "lucide-react";

export const categoryIconMap: Record<string, any> = {
  celebration: PartyPopper,
  music: Music,
  sports: Trophy,
  business: Briefcase,
  science: FlaskConical,
  education: GraduationCap,
  food: Utensils,
  health: HeartPulse,
  arts: Theater,
  travel: Plane,
  default: FolderKanban,
};

export const categoryIconOptions = [
  { id: 1, name: "Celebration", value: "celebration", icon: PartyPopper },
  { id: 2, name: "Music", value: "music", icon: Music },
  { id: 3, name: "Sports", value: "sports", icon: Trophy },
  { id: 4, name: "Business", value: "business", icon: Briefcase },
  { id: 5, name: "Science", value: "science", icon: FlaskConical },
  { id: 6, name: "Education", value: "education", icon: GraduationCap },
  { id: 7, name: "Food", value: "food", icon: Utensils },
  { id: 8, name: "Health", value: "health", icon: HeartPulse },
  { id: 9, name: "Arts", value: "arts", icon: Theater },
  { id: 10, name: "Travel", value: "travel", icon: Plane },
];

export interface CategoryType {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  status?: "active" | "inactive";
}
