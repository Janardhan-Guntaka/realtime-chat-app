import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  {
    bg: "bg-[#712c4a57]",
    text: "text-[#ff006e]",
    border: "border-[1px] border-[#ff006faa]",
  },
  {
    bg: "bg-[#ffd60a2a]",
    text: "text-[#ffd60a]",
    border: "border-[1px] border-[#ffd60abb]",
  },
  {
    bg: "bg-[#06d6a02a]",
    text: "text-[#06d6a0]",
    border: "border-[1px] border-[#06d6a0bb]",
  },
  {
    bg: "bg-[#4cc9f02a]",
    text: "text-[#4cc9f0]",
    border: "border-[1px] border-[#4cc9f0bb]",
  },
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return `${colors[color].bg} ${colors[color].text} ${colors[color].border}`;
  }
  return `${colors[0].bg} ${colors[0].text} ${colors[0].border}`;
};


export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData, 
};