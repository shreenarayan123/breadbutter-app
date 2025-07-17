"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCustomer } from "@/hooks/use-customer";
import { useRouter } from "next/navigation";
import { createProject } from "@/actions/project";
import { useProject } from "@/hooks/use-project";

type Props = {};
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  clientNeed: z.string().min(20, {
    message: "Requirement must be at least 20 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  budget: z.number().min(2, {
    message: "Budget must be at least 2.",
  }),
  stylePreference: z
    .array(z.string().min(2, "Each style must be at least 2 characters."))
    .min(1, { message: "Select at least one style preference." }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
});
const ProjectForm = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      clientNeed: "",
      location: "",
      budget: 0,
      stylePreference: [],
      category: "",
    },
  });
  const router = useRouter();
  const { createNewProject, loading, project } = useProject();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
   await createNewProject(
      values.title,
      values.location,
      values.clientNeed,
      
      values.budget,
      localStorage.getItem("customerId") || "",
      values.stylePreference,
      values.category
    );
    window.location.reload();
  }
  return (
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientNeed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Input placeholder="Requirements" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="budget"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stylePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style Preferences</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {[
                      "Modern",
                      "Traditional",
                      "Minimalist",
                      "Rustic",
                      "Contemporary",
                    ].map((style) => (
                      <label key={style} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.value.includes(style)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, style]);
                            } else {
                              field.onChange(
                                field.value.filter((s) => s !== style)
                              );
                            }
                          }}
                        />
                        {style}
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  );
};

export default ProjectForm;
