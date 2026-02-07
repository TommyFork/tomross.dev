"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";
import DogRunnerGame from "@/components/DogRunnerGame";

const GAME_WRAPPER_HEIGHT = 210; // matches DogRunnerGame CANVAS_HEIGHT
const TRANSITION_DURATION = 300;

export default function Footer() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const [showGame, setShowGame] = useState(false);
  const [gameExpanded, setGameExpanded] = useState(false);
  const [animateHeight, setAnimateHeight] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const openGame = useCallback(() => {
    setAnimateHeight(false); // No transition on open — appear at full height
    setShowGame(true);
    setGameExpanded(true);
    requestAnimationFrame(() => {
      setAnimateHeight(true); // Re-enable for future close
      footerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, []);

  const closeGame = useCallback(() => {
    setAnimateHeight(true);
    setGameExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setShowGame(false);
      setAnimateHeight(false);
    }, TRANSITION_DURATION);
  }, []);

  useEffect(() => {
    if (!isAboutPage && showGame) {
      setGameExpanded(false);
      setShowGame(false);
    }
  }, [isAboutPage, showGame]);

  return (
    <footer
      ref={footerRef}
      className="relative py-10 text-sm text-neutral-500"
    >
      {isAboutPage && showGame ? (
        <div
          className={`overflow-hidden ${animateHeight ? "transition-[max-height] duration-300 ease-in-out" : ""}`}
          style={{
            maxHeight: gameExpanded ? `${GAME_WRAPPER_HEIGHT}px` : "0px",
          }}
        >
          <DogRunnerGame onExit={closeGame} />
        </div>
      ) : null}
      <div
        className={`flex items-center justify-between ${
          isAboutPage ? "border-t border-neutral-200/70 pt-10" : ""
        }`}
      >
        <p>© {new Date().getFullYear()} Tommy Ross</p>
        <div className="flex items-center gap-5 text-neutral-700">
          <Link
            href="https://github.com/TommyFork"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="transition-colors duration-150 hover:text-neutral-900"
          >
            <GitHubIcon width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/rosstommy/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="transition-colors duration-150 hover:text-neutral-900"
          >
            <LinkedInIcon width={20} height={20} />
          </Link>
          <Link
            href="https://x.com/tommytelos"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="X"
            className="transition-colors duration-150 hover:text-neutral-900"
          >
            <XIcon width={20} height={20} />
          </Link>
          {isAboutPage ? (
            <div className="relative group">
              <button
                type="button"
                onClick={(event) => {
                  event.currentTarget.blur();
                  if (showGame) {
                    closeGame();
                  } else {
                    openGame();
                  }
                }}
                aria-label={showGame ? "Hide dog runner" : "Play dog runner"}
                aria-pressed={showGame}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition-all duration-200 hover:-translate-y-[1px] hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95 cursor-pointer"
              >
                <Image
                  src="/dino/dog.png"
                  alt="Dog runner"
                  width={20}
                  height={20}
                  className="pointer-events-none"
                />
              </button>
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-500 opacity-0 shadow-sm transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                Click me!
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
