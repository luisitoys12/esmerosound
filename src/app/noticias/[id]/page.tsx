import { newsArticles } from "@/lib/news-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NoticiaPage({ params }: { params: { id: string } }) {
  const article = newsArticles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Button asChild variant="ghost">
            <Link href="/#noticias" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Noticias
            </Link>
          </Button>
        </div>
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={1200}
              height={600}
              className="object-cover w-full h-64 md:h-96"
              data-ai-hint={article.dataAiHint}
            />
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>

            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {article.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none text-foreground/90">
              <p>{article.content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
