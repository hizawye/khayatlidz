"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Box,
  Container,
  ListItemIcon,
  Divider
} from "@mui/material";
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  Palette as DesignsIcon,
  Person as ProfileIcon,
  ExitToApp as LogoutIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/ar");
    setIsMenuOpen(false);
  };

  return (
    <AppBar 
      position="sticky" 
      className="bg-gradient-to-r from-purple-700 to-purple-900"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar className="justify-between px-0 min-h-[4rem] md:min-h-[5rem]">
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white hover:text-purple-200"
            size="medium"
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box className="hidden md:flex items-center gap-6 lg:gap-10 flex-grow justify-center">
            <Link 
              href="/ar" 
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              الرئيسية
            </Link>
            <Link 
              href="/ar/designs" 
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              التصاميم
            </Link>
            <Link 
              href="/ar/categories" 
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              الفئات
            </Link>
            <Authenticated>
              <Link 
                href="/ar/profile" 
                className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
              >
                الملف الشخصي
              </Link>
            </Authenticated>
          </Box>

          {/* Auth & Language */}
          <Box className="flex items-center gap-3 md:gap-5">
            <Box className="hidden sm:block">
            <LanguageSwitcher />
            </Box>
            <Authenticated>
              <Box className="flex items-center">
                <Link href="/ar/profile">
                  <Box 
                    className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] relative rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all"
                    style={{ minWidth: '36px' }}
                  >
                    {user ? (
                      <>
                        <Image
                          src={user.imageUrl || "/default-avatar.jpg"}
                          alt={user.fullName || "Profile"}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 768px) 36px, 42px"
                          priority
                        />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-500 rounded-full border-2 border-[#7e22ce]"></div>
                      </>
                    ) : (
                      <div className="w-full h-full rounded-full bg-purple-200 animate-pulse" />
                    )}
                  </Box>
                </Link>
              </Box>
            </Authenticated>
            <Unauthenticated>
              <Button
                variant="contained"
                size="medium"
                className="bg-purple-600 hover:bg-purple-700 normal-case px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base"
              >
                <SignInButton mode="modal">
                  <span>تسجيل الدخول</span>
                </SignInButton>
              </Button>
            </Unauthenticated>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu - Updated */}
      <Drawer 
        anchor="right" 
        open={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          className: "w-[280px] sm:w-[320px]"
        }}
      >
        <Box className="p-4 md:p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <h2 className="text-xl md:text-2xl font-bold">القائمة</h2>
        </Box>
        <List className="p-3 md:p-4">
          <ListItem 
            component={Link} 
            href="/ar" 
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-purple-50 rounded-lg mb-2"
          >
            <ListItemIcon>
              <HomeIcon className="text-purple-600" />
            </ListItemIcon>
            <ListItemText 
              primary="الرئيسية" 
              className="text-right"
              primaryTypographyProps={{ className: "font-medium" }}
            />
          </ListItem>
          
          <ListItem 
            component={Link} 
            href="/ar/designs" 
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-purple-50 rounded-lg mb-2"
          >
            <ListItemIcon>
              <DesignsIcon className="text-purple-600" />
            </ListItemIcon>
            <ListItemText 
              primary="التصاميم" 
              className="text-right"
              primaryTypographyProps={{ className: "font-medium" }}
            />
          </ListItem>

          <Authenticated>
            <Divider className="my-4" />
            <ListItem 
              component={Link} 
              href="/ar/profile" 
              onClick={() => setIsMenuOpen(false)}
              className="hover:bg-purple-50 rounded-lg mb-2"
            >
              <ListItemIcon>
                <ProfileIcon className="text-purple-600" />
              </ListItemIcon>
              <ListItemText 
                primary="الملف الشخصي" 
                className="text-right"
                primaryTypographyProps={{ className: "font-medium" }}
              />
            </ListItem>
            
            <ListItem 
              onClick={handleSignOut}
              className="hover:bg-red-50 rounded-lg text-red-600 cursor-pointer"
            >
              <ListItemIcon>
                <LogoutIcon className="text-red-500" />
              </ListItemIcon>
              <ListItemText 
                primary="تسجيل الخروج" 
                className="text-right"
                primaryTypographyProps={{ className: "font-medium" }}
              />
            </ListItem>
          </Authenticated>
          
          <Unauthenticated>
            <Divider className="my-4" />
            <ListItem className="px-4">
              <Button
                fullWidth
                variant="contained"
                size="large"
                className="bg-purple-600 hover:bg-purple-700 normal-case py-3 text-[16px]"
              >
                <SignInButton mode="modal">
                  <span>تسجيل الدخول</span>
                </SignInButton>
              </Button>
            </ListItem>
          </Unauthenticated>
        </List>
      </Drawer>
    </AppBar>
  );
};
