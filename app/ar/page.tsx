"use client";

import { Navbar } from "../Navbar";
import { InputWithButton } from "../Input";
import { Button, Container, Typography, Box, Grid, Paper } from "@mui/material";
import { Search, Brush, People, Security, Category, Stars, Storefront, CheckCircle } from '@mui/icons-material';
import Link from "next/link";
import Image from "next/image";
import { ProfileImage } from "../components/ProfileImage";

export default function ArHomePage() {
  return (
    <Box 
      component="main" 
      className="min-h-screen bg-gray-50"
      sx={{ 
        direction: 'rtl',
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden',
        '& .MuiContainer-root': {
          direction: 'rtl',
          paddingLeft: { xs: '16px', sm: '24px' },
          paddingRight: { xs: '16px', sm: '24px' }
        }
      }}
    >
      <Navbar />
      
      {/* Hero Section - Enhanced */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
        <Container 
          maxWidth="lg"
          sx={{
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Box sx={{ 
            maxWidth: '56rem', // max-w-4xl
            margin: '0 auto',
            textAlign: 'center',
            px: { xs: 2, sm: 4, md: 0 } // Responsive padding
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                marginBottom: '1.5rem',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' }
              }}
            >
              منصة رقمية للأزياء التقليدية الجزائرية
            </Typography>
            <Typography 
              sx={{ 
                color: 'rgb(243, 232, 255)',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                marginBottom: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.6
              }}
            >
              اكتشف أفضل التصاميم من أمهر الخياطين والمصممين في الجزائر
            </Typography>
            <Box sx={{ 
              maxWidth: '42rem', // max-w-2xl
              margin: '0 auto',
              px: { xs: 2, sm: 0 }
            }}>
              <InputWithButton />
            </Box>
            <Box sx={{ mt: { xs: 4, md: 6 }, display: 'inline-block' }}>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  padding: { xs: '0.5rem 1.5rem', md: '0.75rem 2rem' },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                تصفح جميع التصاميم
              </Button>
            </Box>
          </Box>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-purple-50">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              color: 'rgb(88, 28, 135)',
              marginBottom: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.5rem' }
            }}
          >
            لماذا خياطلي دي زاد؟
          </Typography>
          
          <Grid container spacing={{ xs: 4, md: 6, lg: 8 }}>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{
                  position: 'relative',
                  height: { xs: '300px', sm: '400px', md: '500px' },
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  poster="/video-poster.jpg"
                >
                  <source src="/videos/tailor-working.mp4" type="video/mp4" />
                  <source src="/videos/tailor-working.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <Box sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }} />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                height: '100%',
                px: { xs: 2, sm: 4, md: 0 }
              }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    textAlign: 'right',
                    color: 'rgb(91, 33, 182)',
                    marginBottom: { xs: '1rem', md: '1.5rem' },
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' }
                  }}
                >
                  نجمع بين الأصالة والإبداع
                </Typography>
                
                <Typography 
                  sx={{ 
                    textAlign: 'right',
                    color: 'rgb(55, 65, 81)',
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    lineHeight: 1.75,
                    marginBottom: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  نحن نؤمن بأن الأزياء التقليدية الجزائرية هي كنز ثقافي يستحق الحفاظ عليه وتطويره. 
                  من خلال منصتنا، نقدم لك فرصة فريدة للوصول إلى أمهر الخياطين والمصممين الذين يجمعون 
                  بين الأصالة التقليدية والتصاميم العصرية.
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 1.5, md: 2 }
                }}>
                  {features.map((feature, index) => (
                    <Box 
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1.5, md: 2 },
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Typography sx={{ 
                        color: 'rgb(55, 65, 81)',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}>
                        {feature.description}
                      </Typography>
                      <CheckCircle sx={{ 
                        color: 'rgb(34, 197, 94)', 
                        fontSize: { xs: 24, md: 28 } 
                      }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ 
            textAlign: 'center', 
            marginTop: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgb(109, 40, 217)',
                marginBottom: { xs: '1rem', md: '1.5rem' },
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              انضم إلينا اليوم واكتشف عالم الأزياء التقليدية الجزائرية
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'rgb(124, 58, 237)',
                padding: { xs: '0.5rem 1.5rem', md: '0.75rem 2rem' },
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                '&:hover': {
                  backgroundColor: 'rgb(109, 40, 217)'
                }
              }}
            >
              تصفح التصاميم الآن
            </Button>
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

      {/* Featured Tailors Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              color: 'rgb(88, 28, 135)',
              marginBottom: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.5rem' }
            }}
          >
            أشهر الخياطين
          </Typography>
          
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
            {featuredTailors.map((tailor) => (
              <Grid item xs={12} sm={6} md={4} key={tailor.name}>
                <Paper 
                  elevation={1}
                  sx={{
                    padding: { xs: '1.5rem', md: '2rem' },
                    textAlign: 'center',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '&:hover': {
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }
                  }}
                >
                  <Box sx={{ width: { xs: '120px', sm: '140px', md: '160px' }, mb: 3 }}>
                    <ProfileImage
                      src={tailor.image}
                      alt={tailor.name}
                      size={160}
                    />
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                  >
                    {tailor.name}
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      color: 'rgb(75, 85, 99)',
                      mb: 2,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {tailor.specialty}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    color: 'rgb(234, 179, 8)',
                    mb: 3
                  }}>
                    <Stars sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {tailor.rating}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Link href={`/ar/tailors/${tailor.id}`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Storefront sx={{ ml: 1 }} />}
                        sx={{
                          backgroundColor: 'rgb(124, 58, 237)',
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          padding: { xs: '0.5rem 1rem', sm: '0.5rem 1.5rem' },
                          '&:hover': {
                            backgroundColor: 'rgb(109, 40, 217)'
                          }
                        }}
                      >
                        عرض المتجر
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
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
    </Box>
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