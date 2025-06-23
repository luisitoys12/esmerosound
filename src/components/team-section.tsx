"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types";
import { getTeamMembers } from "@/lib/firebase/team";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getTeamMembers(4);
        setTeamMembers(members);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);


  return (
    <section id="equipo" className="mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-left font-headline">
          Nuestro Equipo
        </h2>
         <Button asChild variant="outline">
          <Link href="/equipo">
            Ver Todo el Equipo <Users className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="w-full aspect-square" />
              <CardContent className="p-6 text-center">
                 <Skeleton className="h-6 w-3/4 mx-auto" />
                 <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
              </CardContent>
            </Card>
          ))
        ) : (
          teamMembers.map((member) => (
            <Card key={member.id} className="text-center overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
              <Link href={`/equipo/${member.id}`} className="block">
                <CardHeader className="p-0">
                    <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover aspect-square"
                    data-ai-hint={member.dataAiHint}
                    />
                </CardHeader>
              </Link>
              <CardContent className="p-6">
                <Link href={`/equipo/${member.id}`}>
                    <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                    <CardDescription className="text-primary mt-1">{member.role}</CardDescription>
                </Link>
                <div className="flex justify-center gap-2 mt-4">
                  {member.twitterUrl && (
                    <Button asChild variant="ghost" size="icon">
                      <Link href={member.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                  {member.instagramUrl && (
                    <Button asChild variant="ghost" size="icon">
                      <Link href={member.instagramUrl} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
