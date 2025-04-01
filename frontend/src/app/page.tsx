import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Terminalnterface from "@/components/TerminalInterface";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function Home() {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center gap-8">
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-4">
          <SparklesText text="Next.js + Express" />
          <SparklesText text="Login Template" />
        </div>
        <Link href="/login">
          <Button variant="outline" className="w-full max-w-[300px]">
            ✨ <hr className="mx-1 h-4 w-px shrink-0 bg-neutral-500" /> Login or Register <ChevronRight />
          </Button>
        </Link>
      </div>
      <Terminalnterface />
    </div>
  );
}
