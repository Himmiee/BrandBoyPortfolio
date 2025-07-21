import {
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { GrFacebookOption } from "react-icons/gr";
import React from "react";
import { ISocialIcon } from "@/types/interface/hero.interface";


export const socialIcons: ISocialIcon[] = [
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: IoLogoTiktok, label: "TikTok" },
  { icon: GrFacebookOption, label: "Facebook" },
  { icon: FaPinterestP, label: "Pinterest" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

export const navLinks: string[] = ["PROJECTS", "ABOUT US", "CONTACT US"];
