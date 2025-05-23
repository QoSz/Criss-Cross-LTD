import { AuroraBackground } from "@/components/ui/aurora-background";
import HeroClient from "./HeroContent";

export default function Hero() {
  return (
    <AuroraBackground>
      <div className="relative w-full overflow-x-hidden">
        <HeroClient />
      </div>
    </AuroraBackground>
  )
}
