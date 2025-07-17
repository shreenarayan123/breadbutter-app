'use server'
import { client } from "@/lib/prisma";



export const createProject = async (
    title: string,
    clientNeed: string,
    location: string,
    budget: number,
    customerId: string,
    stylePref: string[],
    category: string
) => {
    try {
        const project = await client.project.create({
            data: {
                title: title,
                clientNeed: clientNeed,
                location: location,
                budget: budget,
                customerId: customerId,
                stylePref: stylePref,
                category: category
            }
        })
        if (project) {
            console.log("Project created successfully:", project);
            return project;
        }
    } catch (error) {
        console.error("Error creating project:", error);
    }
}

export const getCustomerProjects = async (customerId: string) => {
    try {
        const projects = await client.project.findMany({
            where: {
                customerId: customerId
            }
        });
        return projects;
    } catch (error) {
        console.error("Error fetching customer projects:", error);
    }
}

export const getSingleProject = async (projectId: string) => {
    try {
        const project = await client.project.findUnique({
            where: {
                id: projectId
            }
        });
        return project;
    } catch (error) {
        console.error("Error fetching single project:", error);
    }
}