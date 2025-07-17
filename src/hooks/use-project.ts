"use client";
import { createProject, getCustomerProjects } from "@/actions/project";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  clientNeed: string;
  location: string;
  budget: number;
  customerId: string;
  stylePref: string[];
  category: string;
}
export const useProject = () => {
  const [project, setProject] = useState<Project[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");

  useEffect(() => {
    const storedId = localStorage.getItem("customerId") || "";
    setCustomerId(storedId);
  }, []);

  const createNewProject = async (
    title: string,
    clientNeed: string,
    location: string,
    budget: number,
    customerId: string,
    stylePref: string[],
    category: string
  ) => {
    try {
      setLoading(true);
      const res = await createProject(
        title,
        location,
        clientNeed,
        budget,
        customerId,
        stylePref,
        category
      );
      setLoading(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      const projects = await getCustomerProjects("cmd7apao10000upqw69ifhhpv");
      setProject(projects);
    } catch (error) {
      console.error("Error fetching customer projects:", error);
    }
  };
  return {
    createNewProject,
    getProjects,
    loading,
    project,
  };
};
