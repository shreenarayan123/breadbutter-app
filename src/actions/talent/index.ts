"use server";
import { client } from "@/lib/prisma";

export const createTalent = async (
  name: string,
  city: string,
  category: string[],
  skils: string[],
  experience: number,
  budgetRange: string,
  portfolioUrl: string
) => {
  try {
    const talent = await client.talent.create({
      data: {
        name: name,
        city: city,
        category: category,
        skils: skils,
        experience: experience,
        budgetRange: budgetRange,
        portfolioUrl: portfolioUrl,
      },
    });
    if (talent) {
      console.log("Talent created successfully:", talent);
      return talent;
    }
  } catch (error) {
    console.error("Error creating talent:", error);
  }
};

export const getAllTalents = async () => {
  try {
    const talents = await client.talent.findMany();
    return talents;
  } catch (error) {
    console.error("Error fetching all talents:", error);
  }
};
