"use client";

import { Navbar } from "../Navbar";
import { InputWithButton } from "../Input";
import { Button } from "@/components/ui/button";
import { Search, Brush, Users, Shield, CheckCircle, Star, Store } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { ProfileImage } from "../components/ProfileImage";

// TypeScript Interfaces
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Category {
  name: string;
  slug: string;
  image: string;
}

interface Tailor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
}

export default function FrHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 w-full overflow-x-hidden" dir="ltr">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-8 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 font-light text-white/90">
              Plateforme numérique pour la mode traditionnelle algérienne
            </h1>
            <p className="text-purple-100 text-base sm:text-lg md:text-xl mb-8 md:mb-10 leading-relaxed">
              Découvrez les meilleurs designs des couturiers et créateurs les plus talentueux d'Algérie
            </p>
            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <InputWithButton />
            </div>
            <div className="mt-8 md:mt-12 inline-block">
              <Link href="/fr/designs">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/70 hover:bg-white/10 hover:border-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                >
                  Parcourir tous les designs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center text-brand-900 mb-12 md:mb-16 font-bold">
            Pourquoi Khayatlidz ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Vidéo montrant un couturier travaillant sur des designs traditionnels"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/video-poster.jpg"
                >
                  <source src="/videos/tailor-working.mp4" type="video/mp4" />
                  <source src="/videos/tailor-working.webm" type="video/webm" />
                  <track kind="captions" src="/videos/tailor-working-ar.vtt" srcLang="ar" label="العربية" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>

            <div>
              <div className="space-y-6">
                {[
                  { title: "Authenticité et Tradition", description: "Nous préservons l'héritage algérien authentique dans chaque design" },
                  { title: "Haute Qualité", description: "Nous travaillons avec les meilleurs couturiers professionnels d'Algérie" },
                  { title: "Variété de Choix", description: "Large gamme de vêtements traditionnels pour toutes les occasions" },
                  { title: "Service Exceptionnel", description: "Nous vous garantissons une expérience d'achat facile et agréable" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-brand-50 transition-colors">
                    <CheckCircle className="w-6 h-6 text-brand-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-brand-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl text-center text-brand-900 mb-16 font-bold">
            Parcourir par Catégorie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/fr/categories/${category.slug}`}>
                <div className="relative h-72 group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={`Image de design ${category.name} traditionnel algérien`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm">Explorer plus</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/fr/designs">
              <Button
                size="lg"
                className="px-8 py-6 text-base md:text-lg"
              >
                Parcourir les designs maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-brand-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl text-center text-brand-900 mb-16 font-bold">
            Ce qui nous distingue
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tailors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl md:text-4xl text-brand-900 font-bold">
              Couturiers en Vedette
            </h2>
            <Link href="/fr/tailors" className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-2">
              <span>Voir tout</span>
              <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTailors.map((tailor) => (
              <div
                key={tailor.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image
                    src={tailor.image}
                    alt={`Couturier ${tailor.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-brand-900 mb-2">{tailor.name}</h3>
                  <p className="text-gray-600 mb-4">{tailor.specialty}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">{tailor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-brand-700 to-brand-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Store className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Êtes-vous couturier ou créateur ?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Rejoignez notre plateforme et présentez vos créations à des milliers de clients
          </p>
          <Link href="/fr/profile">
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-brand-700 px-8 py-6 text-lg"
            >
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

const features: Feature[] = [
  {
    icon: <Search className="text-brand-600 w-12 h-12" />,
    title: "Recherche Facile",
    description: "Trouvez les designs qui vous conviennent facilement et rapidement"
  },
  {
    icon: <Brush className="text-brand-600 w-12 h-12" />,
    title: "Designs Exclusifs",
    description: "Découvrez une collection variée de designs modernes et traditionnels"
  },
  {
    icon: <Users className="text-brand-600 w-12 h-12" />,
    title: "Couturiers Professionnels",
    description: "Connectez-vous directement avec les meilleurs couturiers et créateurs d'Algérie"
  },
  {
    icon: <Shield className="text-brand-600 w-12 h-12" />,
    title: "Garantie Qualité",
    description: "Nous garantissons les plus hauts standards de qualité dans l'exécution et le service"
  }
];

const categories: Category[] = [
  {
    name: "Caftan",
    slug: "kaftan",
    image: "/categories/kaftan.jpg"
  },
  {
    name: "Djebba",
    slug: "djebba",
    image: "/categories/djebba.jpg"
  },
  {
    name: "Gandoura",
    slug: "gandoura",
    image: "/categories/gandoura.jpg"
  },
  {
    name: "Costume Traditionnel",
    slug: "traditional-suit",
    image: "/categories/traditional-suit.jpg"
  },
  {
    name: "Karakou",
    slug: "karakou",
    image: "/categories/karakou.jpg"
  },
  {
    name: "Fetla",
    slug: "fetla",
    image: "/categories/fetla.jpg"
  }
];

const featuredTailors: Tailor[] = [
  {
    id: "1",
    name: "Fatima Zahra",
    specialty: "Caftan Moderne",
    rating: 4.9,
    image: "/tailors/tailor1.jpg"
  },
  {
    id: "2",
    name: "Noureddine",
    specialty: "Costumes Traditionnels",
    rating: 4.8,
    image: "/tailors/tailor2.jpg"
  },
  {
    id: "3",
    name: "Zainab",
    specialty: "Karakou Algérois",
    rating: 4.9,
    image: "/tailors/tailor3.jpg"
  }
];
