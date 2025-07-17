"use client";
import { createTalent } from "@/actions/talent";
import { Data } from "@/lib/Data";
import { useState } from "react";

interface Talent {
  id: string;
  name: string;
  city: string;
  category: string[];
  skils: string[];
  experience: number;
  budgetRange: string;
  portfolioUrl: string;
}
export const useTalent = () => {
  const [talents, setTalents] = useState<Talent>();
  const [loading, setLoading] = useState<boolean>(false);
  
  const create = async (
    name: string,
    city: string,
    category: string[],
    skils: string[],
    experience: number,
    budgetRange: string,
    portfolioUrl: string
  ) => {
    try {
      setLoading(true);
      const res = await createTalent(
        name,
        city,
        category,
        skils,
        experience,
        budgetRange,
        portfolioUrl
      );

      if (res) {
        setTalents(res);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAllTalents = async () => {
    for (const talent of Data) {
      const [name, city, category, skils, experience, budgetRange, portfolioUrl] = talent as [string, string, string[], string[], number, string, string];

      await create(name, city, category, skils, experience, budgetRange, portfolioUrl);
    }
    console.log("🎉 All talents uploaded successfully");
  };
  return {
    create,
    talents,
    loading,
    uploadAllTalents
  };
};


