import { getTeamMemberById } from "@/lib/firebase/team";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, ArrowLeft, Mic } from "lucide-react";
import Link from "next/link";

export default async function MemberProfilePage({ params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-4">
          <Button asChild variant="ghost">
            <Link href="/equipo" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Equipo
            </Link>
          </Button>
        </div>
      <Card className="max-w-4xl mx-auto overflow-hidden md:flex">
        <div className="md:w-1/3">
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={400}
            height={400}
            className="object-cover w-full h-full aspect-square"
            data-ai-hint={member.dataAiHint}
          />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <CardHeader className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{member.name}</h1>
            <p className="text-xl text-primary font-semibold">{member.role}</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow">
            <div className="prose dark:prose-invert max-w-none text-foreground/90">
              <p>{member.bio || "Biografía no disponible."}</p>
            </div>
          </CardContent>
           <CardFooter className="p-6 pt-0 flex-col items-start gap-4">
                {/* Placeholder for shows */}
                <div className="w-full">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <Mic className="h-5 w-5"/>
                        Programas
                    </h3>
                    <p className="text-sm text-muted-foreground">Próximamente: Horarios y programas asociados.</p>
                </div>
                { (member.twitterUrl || member.instagramUrl) && (
                    <div className="w-full border-t pt-4">
                        <h3 className="font-semibold mb-2">Sígueme</h3>
                        <div className="flex gap-1">
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
                    </div>
                 )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
