import type { PortfolioConfig } from "@/types/portfolio";
import configData from "../../portfolio-config.json";

export function getConfig(): PortfolioConfig {
  const config = configData as PortfolioConfig;
  return {
    ...config,
    personal: {
      ...config.personal,
      // Email is kept out of the committed config file to avoid scraping.
      // Set NEXT_PUBLIC_CONTACT_EMAIL in .env.local (or Vercel env vars).
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? config.personal.email,
    },
  };
}

const config = getConfig();

export const personalInfo = config.personal;
export const education = config.education;
export const experience = config.experience;
export const skills = config.skills;
export const projects = config.projects;
export const social = config.social;
export const presetQuestions = config.presetQuestions;
