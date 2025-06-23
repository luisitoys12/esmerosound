import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="equipo" className="mb-12">
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-left font-headline mb-6">
        Nuestro Equipo
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="text-center overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <CardHeader className="p-0">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint={member.dataAiHint}
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
              <CardDescription className="text-primary mt-1">{member.role}</CardDescription>
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
    </section>
  );
}
