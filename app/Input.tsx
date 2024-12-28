'use client';

import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function InputWithButton() {
  return (
    <div className="flex flex-col space-y-3 max-w-xl mx-auto">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="...قفطان, روبة"
        className="bg-white/95 rounded-lg shadow-lg"
        InputProps={{
          className: "text-right py-3",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-purple-600" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        className="bg-purple-600 hover:bg-purple-700 text-xl font-bold normal-case py-3 shadow-lg"
        fullWidth
      >
        ابحث عن التصاميم
      </Button>
    </div>
  );
}
