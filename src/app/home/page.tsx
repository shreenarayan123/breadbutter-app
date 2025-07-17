"use client";
import React, { useEffect, useState } from "react";
import { useProject } from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "@/components/projectForm";
import { MoreVertical } from "lucide-react";
import { useTalent } from "@/hooks/use-talent";
import { Data } from "@/lib/Data";
import { matchScore } from "@/lib/match";
import { useMatch } from "@/hooks/use-match";

type Props = {};

interface Project {
  title: string;
  clientNeed: string; // e.g., "javascript react node"
  location: string;
  budget: number;
  customerId: string;
  stylePref: string[]; // e.g., ["modern", "bold"]
  category: string; // e.g., "web dev UI/UX design"
}

interface Talent {
  id: string;
  name: string;
  city: string;
  category: string[]; // e.g., ["web dev", "UI/UX"]
  skils: string[]; // e.g., ["javascript", "react"]
  experience: number;
  budgetRange: string; // "$250 - $500"
  portfolioUrl: string;
}

const page = (props: Props) => {
  const { getProjects, loading, project } = useProject();
  const { getMatches, matches, matchingLoading } = useMatch();
  useEffect(() => {
    getProjects();
  }, []);

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleButtonClick = (projectId: string) => {
    setActiveProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const handleMatch = (id: string): undefined => {
    getMatches(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
      <div className="w-full flex items-center gap-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Create New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <ProjectForm />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className={` py-2 px-4 rounded-md text-white font-medium transition-colors
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Project"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div>
          {project && project.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.map((project: any) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 gap-5">
                      <h2 className="text-xl font-bold text-gray-800">
                        {project.title}
                      </h2>
                      <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                        ${project.budget}
                      </span>
                      <div className="relative">
                        <Button
                          className="cursor-pointer"
                          onClick={() => handleButtonClick(project.id)}
                          variant="ghost"
                          size="icon"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                        {activeProjectId === project.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <Button
                              onClick={() => handleMatch(project.id)}
                              variant="ghost"
                              className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100"
                            >
                              See relevant talent
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 font-medium">
                        {project.clientNeed}
                      </p>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-[400px]">
        {matches && matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match: any) => (
              <div
                key={match.talent.id}
                className="bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {match.talent.name}
                    </h2>
                    <div className="px-4 py-2 bg-blue-100 rounded-full">
                      <span className="font-bold text-blue-800">
                        Score: {match.score}%
                      </span>
                    </div>
                  </div>
                  {match.reasons && match.reasons.length > 0 && (
                    <ul className="space-y-2 text-gray-600">
                      {match.reasons.map((reason: any, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : matchingLoading ? (
          <p className="text-gray-600">Loading matches...</p>
        ) : (
          <p className="text-gray-600">No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
