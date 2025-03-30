import LoginButton from "@/components/LoginButton";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Terminalnterface from "@/components/TerminalInterface";

export default function Home() {

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center gap-8">

      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-4">
          <SparklesText text="Next.js + Express" />
          <SparklesText text="Login Template" />
        </div>

        <LoginButton />
      </div>

      <Terminalnterface />
    </div>

  );
}
