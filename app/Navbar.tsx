"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserButton, useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { 
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    setIsMenuOpen(false);
    handleClose();
  };

  const handleProfileNav = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <>
      <AppBar position="static" className="bg-gradient-to-r from-purple-600 to-purple-900">
        <Toolbar className="justify-between">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
          >
            <MenuIcon />
          </IconButton>
          
          <h1 className="font-bold text-2xl flex-auto text-center text-white">
            <Link href="/">KhayatliDz</Link>
          </h1>

          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-purple-200">
              Home
            </Link>
            <Authenticated>
              <Link href="/profile" className="text-white hover:text-purple-200">
                Profile
              </Link>
            </Authenticated>
          </div>

          <div className="ml-4">
            <Authenticated>
              <div className="flex items-center gap-4">
                <IconButton onClick={handleProfileClick}>
                  <Avatar
                    src={user?.imageUrl}
                    alt={user?.fullName || "Profile"}
                    className="border-2 border-white hover:border-purple-200"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => handleProfileNav('/profile')}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" className="text-purple-600" />
                    </ListItemIcon>
                    <span className="text-right">الملف الشخصي</span>
                  </MenuItem>
                  <MenuItem onClick={() => handleProfileNav('/settings')}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" className="text-purple-600" />
                    </ListItemIcon>
                    <span className="text-right">الإعدادات</span>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut} className="text-red-500">
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" className="text-red-500" />
                    </ListItemIcon>
                    <span className="text-right">تسجيل الخروج</span>
                  </MenuItem>
                </Menu>
              </div>
            </Authenticated>
            <Unauthenticated>
              <Button
                variant="contained"
                className="bg-white text-purple-600 hover:bg-purple-100"
              >
                <SignInButton mode="modal">
                  <span>تسجيل الدخول</span>
                </SignInButton>
              </Button>
            </Unauthenticated>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <List className="w-64 bg-purple-900 h-full text-white">
          <ListItem component={Link} href="/" onClick={() => setIsMenuOpen(false)}>
            <ListItemText primary="Home" />
          </ListItem>
          <Authenticated>
            <ListItem component={Link} href="/profile" onClick={() => setIsMenuOpen(false)}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem onClick={handleSignOut}>
              <ListItemText primary="تسجيل الخروج" className="text-red-300" />
            </ListItem>
          </Authenticated>
          <Unauthenticated>
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                className="bg-white text-purple-600 hover:bg-purple-100"
              >
                <SignInButton mode="modal">
                  <span>تسجيل الدخول</span>
                </SignInButton>
              </Button>
            </ListItem>
          </Unauthenticated>
        </List>
      </Drawer>
    </>
  );
};
