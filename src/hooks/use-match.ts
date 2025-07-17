"use client";
import { useState } from "react";

export const useMatch = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [matchingLoading, setmatchingLoading] = useState<boolean>(false);

  const getMatches = async (gigId: string) => {
    setmatchingLoading(true);
    try {
      const response = await fetch(`/api/match/${gigId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }

      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setmatchingLoading(false);
    }
  };

  return {
    matches,
    matchingLoading,
    getMatches,
  };
};
