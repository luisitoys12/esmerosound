"use client";

import Image from "next/image";
import Player from "@/components/player";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveClock from "@/components/live-clock";
import { getNewsArticles } from "@/lib/firebase/news";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";
import type { NewsArticle } from "@/types";
import { useEffect, useState } from "react";
import Slideshow from "@/components/slideshow";
import WhatsNewDialog from "@/components/whats-new-dialog";
import AdBanner from "@/components/ad-banner";

export default function Home() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getNewsArticles(3);
        setNewsArticles(articles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <LiveClock />

      <section className="mb-12">
        <Slideshow />
      </section>

      <section className="mb-12">
        <Player />
      </section>

      <section id="noticias" className="mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-left font-headline">
            Últimas Noticias
          </h2>
          <Button variant="outline" onClick={() => setIsWhatsNewOpen(true)}>
            <Gift className="mr-2 h-4 w-4" /> Novedades
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
            >
              <CardHeader className="p-0">
                <Image
                  src={article.imageUrl || "https://placehold.co/600x400.png"}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48"
                  data-ai-hint={article.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="mb-2 text-xl font-semibold font-headline">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Button asChild variant="link" className="p-0 h-auto font-semibold">
                  <Link href={`/noticias/${article.id}`}>
                    Ver más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <AdBanner />
      </section>

      <WhatsNewDialog isOpen={isWhatsNewOpen} onOpenChange={setIsWhatsNewOpen} />
    </div>
  );
}
