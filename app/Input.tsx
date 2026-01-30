"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InputWithButton() {
  return (
    <div className="flex items-center gap-2 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="...قفطان, روبة"
          className="w-full pr-10 py-6 text-right border-brand-300 focus:border-brand-500"
        />
      </div>
      <Button size="lg" className="px-6 py-6">
        بحث
      </Button>
    </div>
  );
}
