import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm  flex-col space-y-2">
      <Input type="text" placeholder="...قفطان, روبة" className="text-right" />
      <Button
        type="submit"
        className="font-bold text-xl bg-[#7A3486] hover:bg-emerald-800"
      >
        ابحث
      </Button>
    </div>
  );
}
