'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const languages = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' }
];

export function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode: string) => {
    const segments = pathname.split('/');
    if (segments[1] && languages.some(lang => lang.code === segments[1])) {
      segments[1] = langCode;
    } else {
      segments.splice(1, 0, langCode);
    }
    const newPath = segments.join('/');
    router.push(newPath);
    handleClose();
  };

  const currentLang = languages.find(lang => 
    pathname.startsWith(`/${lang.code}/`)
  ) || languages[0];

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        sx={{
          color: 'white',
          textTransform: 'none',
          fontSize: '0.875rem',
          padding: '6px 8px',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        {currentLang.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 120,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
              justifyContent: 'flex-end', // For RTL support
            }
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLang.code === lang.code}
            dir={lang.dir}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(124, 58, 237, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(124, 58, 237, 0.12)',
                }
              }
            }}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
} 