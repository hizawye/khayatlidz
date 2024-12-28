'use client';

import { Button, Menu, MenuItem } from "@mui/material";
import { Language } from "@mui/icons-material";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLanguage = (lang: string) => {
    const newPath = lang === 'ar' 
      ? `/ar${pathname.replace('/ar', '')}`
      : pathname.replace('/ar', '');
    router.push(newPath);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<Language />}
        className="text-white"
      >
        {pathname.includes('/ar') ? 'العربية' : 'English'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => switchLanguage('ar')}>العربية</MenuItem>
        <MenuItem onClick={() => switchLanguage('en')}>English</MenuItem>
      </Menu>
    </>
  );
} 