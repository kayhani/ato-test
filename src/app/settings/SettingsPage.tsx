"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfile } from "./actions";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

interface SettingsPageProps {
  user: User;
};

export default function SettingsPage({user}: SettingsPageProps) {
  const { toast } = useToast();
  const session = useSession();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    // TODO: Add default value from current user
    defaultValues: { name: user.name || "" },
  });

  async function onSubmit(data: UpdateProfileValues) {
    try {
      await updateProfile(data);
      toast({ description: "Profile updated." });
      session.update();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occurred. Please try again.",
      });
    }
  }

  return (
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        
      </div>
    
  );
}
