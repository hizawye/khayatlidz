"use client";

import { Navbar } from "../Navbar";
import { InputWithButton } from "../Input";
import { Button, Container, Typography, Box, Grid, Paper } from "@mui/material";
import { Search, Brush, People, Security, Category, Stars, Storefront, CheckCircle } from '@mui/icons-material';
import Link from "next/link";
import Image from "next/image";

export default function ArHomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Enhanced */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 py-32">
        <Container maxWidth="lg">
          <div className="max-w-4xl mx-auto text-center">
            
            <Typography variant="h4" className="text-white/90 mb-6 font-light">
              منصة رقمية للأزياء التقليدية الجزائرية
            </Typography>
            <Typography className="text-purple-100 text-xl mb-10">
              اكتشف أفضل التصاميم من أمهر الخياطين والمصممين في الجزائر
            </Typography>
            <div className="max-w-2xl mx-auto">
              <InputWithButton />
            </div>
            <Link href="/ar/designs" className="block mt-10">
              <Button 
                variant="outlined" 
                size="large"
                className="text-white border-white/70 hover:border-white hover:bg-white/10 px-8 py-3"
              >
                تصفح جميع التصاميم
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-purple-50">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center text-purple-900 mb-16 font-bold">
            لماذا خياطلي دي زاد؟
          </Typography>
          
          <Grid container spacing={8} className="mb-16">
            <Grid item xs={12} md={6}>
              <Box className="relative h-[500px] rounded-2xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/video-poster.jpg"
                >
                  <source src="/videos/tailor-working.mp4" type="video/mp4" />
                  <source src="/videos/tailor-working.webm" type="video/webm" />
                  {/* Fallback text */}
                  Your browser does not support the video tag.
                </video>
                {/* Optional overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="flex flex-col justify-center">
              <Typography variant="h4" className="text-right text-purple-800 mb-6 font-bold">
                نجمع بين الأصالة والإبداع
              </Typography>
              <Typography className="text-right text-gray-700 text-lg leading-relaxed mb-8">
                نحن نؤمن بأن الأزياء التقليدية الجزائرية هي كنز ثقافي يستحق الحفاظ عليه وتطويره. 
                من خلال منصتنا، نقدم لك فرصة فريدة للوصول إلى أمهر الخياطين والمصممين الذين يجمعون 
                بين الأصالة التقليدية والتصاميم العصرية.
              </Typography>
              <Box className="space-y-4">
                <Box className="flex items-center gap-4 text-right">
                  <Typography className="text-gray-700">
                    نضمن لك جودة عالية في التنفيذ والخدمة
                  </Typography>
                  <CheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                </Box>
                <Box className="flex items-center gap-4 text-right">
                  <Typography className="text-gray-700">
                    نوفر لك تشكيلة واسعة من التصاميم العصرية والتقليدية
                  </Typography>
                  <CheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                </Box>
                <Box className="flex items-center gap-4 text-right">
                  <Typography className="text-gray-700">
                    نسهل عليك التواصل المباشر مع الخياطين
                  </Typography>
                  <CheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box className="text-center">
            <Typography variant="h5" className="text-purple-700 mb-6">
              انضم إلينا اليوم واكتشف عالم الأزياء التقليدية الجزائرية
            </Typography>
            <Link href="/ar/designs">
              <Button
                variant="contained"
                size="large"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
              >
                تصفح التصاميم الآن
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Categories Preview - Enhanced */}
      <section className="py-24 bg-white">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center text-purple-900 mb-16 font-bold">
            تصفح حسب الفئة
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.name}>
                <Link href={`/ar/categories/${category.slug}`}>
                  <Box className="relative h-72 group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                      <Typography variant="h5" className="text-white font-bold">
                        {category.name}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box className="text-center mt-12">
            <Link href="/ar/categories">
              <Button
                variant="contained"
                size="large"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
                startIcon={<Category className="ml-2" />}
              >
                عرض جميع الفئات
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-gray-50">
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            {features.map((feature) => (
              <Grid item xs={12} md={6} lg={3} key={feature.title}>
                <Paper elevation={0} className="p-8 text-center h-full hover:shadow-md transition-shadow bg-white rounded-xl">
                  {feature.icon}
                  <Typography variant="h5" className="mb-4 font-bold mt-6">
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-600">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Featured Tailors - Enhanced */}
      <section className="py-24 bg-white">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center text-purple-900 mb-16 font-bold">
            أشهر الخياطين
          </Typography>
          <Grid container spacing={6}>
            {featuredTailors.map((tailor) => (
              <Grid item xs={12} sm={6} md={4} key={tailor.name}>
                <Paper className="p-8 text-center hover:shadow-xl transition-all duration-300 rounded-xl">
                  <Box className="relative w-40 h-40 mx-auto mb-6">
                    <Image
                      src={tailor.image}
                      alt={tailor.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </Box>
                  <Typography variant="h5" className="mb-3 font-bold">
                    {tailor.name}
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    {tailor.specialty}
                  </Typography>
                  <Box className="flex justify-center items-center gap-2 text-yellow-500 mb-6">
                    <Stars />
                    <Typography variant="h6">{tailor.rating}</Typography>
                  </Box>
                  <Link href={`/ar/tailors/${tailor.id}`}>
                    <Button
                      variant="contained"
                      size="large"
                      className="bg-purple-600 hover:bg-purple-700 px-6"
                      startIcon={<Storefront className="ml-2" />}
                    >
                      عرض المتجر
                    </Button>
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box className="text-center mt-12">
            <Link href="/ar/tailors">
              <Button
                variant="outlined"
                size="large"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3"
              >
                عرض جميع الخياطين
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* About Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center mb-12 font-bold">
            من نحن
          </Typography>
          <Typography variant="h6" className="text-center max-w-4xl mx-auto leading-relaxed font-light">
            خياطلي دي زاد هي منصة رقمية تجمع بين الحرفية التقليدية والتكنولوجيا الحديثة، 
            نهدف إلى تسهيل الوصول إلى أفضل الخياطين والمصممين في الجزائر. 
            نحن نؤمن بأهمية الحفاظ على تراثنا الثقافي مع مواكبة التطور العصري.
          </Typography>
        </Container>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-purple-950 text-white py-12">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h5" className="mb-6 font-bold">
            خياطلي دي زاد - منصتك الأولى للأزياء التقليدية
          </Typography>
          <Typography className="text-purple-200 mb-4">
            تواصل معنا عبر البريد الإلكتروني: contact@khayatlidz.com
          </Typography>
          <Typography className="text-purple-300">
            © 2024 KhayatliDz. جميع الحقوق محفوظة
          </Typography>
        </Container>
      </footer>
    </main>
  );
}

// Features data
const features = [
  {
    icon: <Search className="text-purple-600 text-5xl" />,
    title: "سهولة البحث",
    description: "ابحث عن التصاميم التي تناسبك بكل سهولة وسرعة"
  },
  {
    icon: <Brush className="text-purple-600 text-5xl" />,
    title: "تصاميم حصرية",
    description: "اكتشف تشكيلة متنوعة من التصاميم العصرية والتقليدية"
  },
  {
    icon: <People className="text-purple-600 text-5xl" />,
    title: "خياطون محترفون",
    description: "تواصل مباشرة مع أفضل الخياطين والمصممين في الجزائر"
  },
  {
    icon: <Security className="text-purple-600 text-5xl" />,
    title: "ضمان الجودة",
    description: "نضمن لك أعلى معايير الجودة في التنفيذ والخدمة"
  }
];

const categories = [
  {
    name: "قفطان",
    slug: "kaftan",
    image: "/categories/kaftan.jpg"
  },
  {
    name: "جبة",
    slug: "djebba",
    image: "/categories/djebba.jpg"
  },
  {
    name: "قندورة",
    slug: "gandoura",
    image: "/categories/gandoura.jpg"
  },
  {
    name: "بدلة تقليدية",
    slug: "traditional-suit",
    image: "/categories/traditional-suit.jpg"
  },
  {
    name: "كراكو",
    slug: "karakou",
    image: "/categories/karakou.jpg"
  },
  {
    name: "فتلة",
    slug: "fetla",
    image: "/categories/fetla.jpg"
  }
];

const featuredTailors = [
  {
    id: "1",
    name: "فاطمة الزهراء",
    specialty: "قفطان عصري",
    rating: 4.9,
    image: "/tailors/tailor1.jpg"
  },
  {
    id: "2",
    name: "نور الدين",
    specialty: "بدل تقليدية",
    rating: 4.8,
    image: "/tailors/tailor2.jpg"
  },
  {
    id: "3",
    name: "زينب",
    specialty: "كراكو عاصمي",
    rating: 4.9,
    image: "/tailors/tailor3.jpg"
  }
]; 