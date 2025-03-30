import LoginButton from "@/components/LoginButton";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      
      <div className="flex flex-col items-center gap-4">
        <SparklesText text="Next.js + Express" />
        <SparklesText text="Login Template" />
      </div>

      <LoginButton />
      
    </div>

  );
}
