import type { PortfolioConfig } from "@/types/portfolio";
import configData from "../../portfolio-config.json";

export function getConfig(): PortfolioConfig {
  return configData as PortfolioConfig;
}

const config = getConfig();

export const personalInfo = config.personal;
export const education = config.education;
export const experience = config.experience;
export const skills = config.skills;
export const projects = config.projects;
export const social = config.social;
export const presetQuestions = config.presetQuestions;
