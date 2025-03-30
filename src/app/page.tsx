import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { DotPattern } from "@/components/magicui/dot-pattern";
import LoginButton from "@/components/LoginButton";




const texts = [
  "Yunnet",
  "Homework"
];

export default function Home() {

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-50"></DotPattern>
      <SparklesText text="Yunnet Homework" />

      <LoginButton />

      <ModeToggle />

    </main>

  );
}
