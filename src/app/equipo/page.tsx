import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/lib/firebase/team";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram } from "lucide-react";
import type { TeamMember } from "@/types";

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await getTeamMembers(20);

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Nuestro Equipo
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Conoce a las voces y talentos que hacen posible Esmerosound.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col">
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
              <CardContent className="p-6 flex-grow flex flex-col">
                <Link href={`/equipo/${member.id}`} className="flex-grow">
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
          ))}
      </div>
    </div>
  );
}
