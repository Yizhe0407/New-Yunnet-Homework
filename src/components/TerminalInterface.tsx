import React from 'react'
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/magicui/terminal";

export default function Terminalnterface() {
    return (
        <Terminal>
            <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

            <AnimatedSpan delay={1500} className="text-green-500">
                <span>✔ Frontend: Next.js</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2000} className="text-green-500">
                <span>✔ Backend: Express</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2500} className="text-green-500">
                <span>✔ CSS: Tailwind CSS</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3000} className="text-green-500">
                <span>✔ Database: MySQL</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3500} className="text-green-500">
                <span>✔ ORM: Prisma</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4000} className="text-green-500">
                <span>✔ UI: Shadcn/ui</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4500} className="text-green-500">
                <span>✔ Verify: JWT(JSON Web Token)</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5000} className="text-green-500">
                <span>✔ Subordinate: Docker</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5500} className="text-green-500">
                <span>✔ Language: Typescript</span>
            </AnimatedSpan>

            <AnimatedSpan delay={6000} className="text-blue-500">
                <span>ℹ Updated 1 file:</span>
                <span className="pl-2">- lib/utils.ts</span>
            </AnimatedSpan>

            <TypingAnimation delay={6500} className="text-muted-foreground">
                Success! Project initialization completed.
            </TypingAnimation>

            <TypingAnimation delay={7000} className="text-muted-foreground">
                You may now add components.
            </TypingAnimation>
        </Terminal>
    );
}
