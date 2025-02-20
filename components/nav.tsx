import Link from "next/link";
import { ModeToggle } from "./ui/theme-switcher";
import { FaGithub } from "react-icons/fa6";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <nav className="fixed flex w-full items-center justify-between bg-background p-6 md:bg-transparent font-poppins">
      <div className="flex flex-1"></div> {/* Pushes content to the right */}
      
      <div className="flex items-center gap-4 justify-end">
        <Link
          href="https://github.com/Divith123/OpenSource-Ninja"
          target="_blank"
          rel="noopener noreferrer">
          <Button
            variant="secondary"
            className="h-9 w-9 p-0 md:w-auto md:px-4 md:py-2 flex items-center justify-center gap-1.5 transition-all duration-300 hover:bg-secondary/80">
            <FaGithub className="h-[1rem] w-[1rem] md:mr-1.5" />
            <span className="hidden md:block text-sm font-medium">GitHub</span>
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
