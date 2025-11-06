"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pixelify_Sans } from "next/font/google";

type GameState = "loading" | "ready" | "running" | "over";

type Assets = {
  dogRun: HTMLImageElement;
  dogRunAlt: HTMLImageElement;
  dogJump: HTMLImageElement;
  tree: HTMLImageElement;
  squirrel: HTMLImageElement;
  mountain: HTMLImageElement;
};

type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
  sprite: HTMLImageElement;
};

type BackgroundItem = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  sprite: HTMLImageElement;
};

const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const CANVAS_HEIGHT = 210;
const FLOOR_Y = CANVAS_HEIGHT;
const DOG_WIDTH = 64;
const DOG_HEIGHT = 52;
const GRAVITY = 2300;
const JUMP_VELOCITY = -720;
const BASE_SPEED = 260;
const MAX_SPEED = 480;
const DOG_FRAME_DURATION = 0.12;
const HIGH_SCORE_STORAGE_KEY = "dog-runner-high-score";
const BASE_SPAWN_DELAY = 1.6;
const MIN_SPAWN_DELAY = 0.75;
const MOUNTAIN_BASE_SPEED = 70;
const INITIAL_MOUNTAIN_DELAY = 2.4;
const MOUNTAIN_SPAWN_DELAY_RANGE = [6.5, 12] as const;
const MIN_GAP_BASE = 160;
const JUMP_TIME = 0.85;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
  });

const loadAssets = async (): Promise<Assets> => {
  const [dogRun, dogRunAlt, dogJump, tree, squirrel, mountain] = await Promise.all([
    loadImage("/dino/dog.png"),
    loadImage("/dino/dog-2.png"),
    loadImage("/dino/dog-jumping.png"),
    loadImage("/dino/tree.png"),
    loadImage("/dino/squirrel.png"),
    loadImage("/dino/mountains.png"),
  ]);
  return { dogRun, dogRunAlt, dogJump, tree, squirrel, mountain };
};

const formatScore = (value: number) => value.toString().padStart(5, "0");

export default function DogRunnerGame({ onExit }: { onExit: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const assetsRef = useRef<Assets | null>(null);

  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const nextSpawnDelayRef = useRef<number>(BASE_SPAWN_DELAY);
  const mountainTimerRef = useRef<number>(0);
  const nextMountainDelayRef = useRef<number>(MOUNTAIN_SPAWN_DELAY_RANGE[0]);
  const scoreRef = useRef<number>(0);
  const highScoreRef = useRef<number>(0);

  const dogRef = useRef({
    x: 56,
    y: FLOOR_Y - DOG_HEIGHT,
    width: DOG_WIDTH,
    height: DOG_HEIGHT,
    vy: 0,
    isJumping: false,
    frameTimer: 0,
    frameIndex: 0,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const backgroundsRef = useRef<BackgroundItem[]>([]);
  const gameStateRef = useRef<GameState>("loading");

  const [isReady, setIsReady] = useState(false);

  const cancelAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  };

  const renderScene = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) {
      return;
    }

    const width = canvas.clientWidth;
    ctx.clearRect(0, 0, width, CANVAS_HEIGHT);

    const assets = assetsRef.current;
    if (!assets) {
      ctx.save();
      ctx.font = "600 22px 'Pixelify Sans', system-ui";
      ctx.fillStyle = "rgba(15,23,42,0.8)";
      ctx.textAlign = "center";
      ctx.fillText("Loading…", width / 2, CANVAS_HEIGHT / 2);
      ctx.restore();
      return;
    }

    backgroundsRef.current.forEach((bg) => {
      ctx.drawImage(bg.sprite, bg.x, bg.y, bg.width, bg.height);
    });

    obstaclesRef.current.forEach((obstacle) => {
      ctx.drawImage(
        obstacle.sprite,
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
      );
    });

    const dog = dogRef.current;
    const dogSprite = dog.isJumping
      ? assets.dogJump
      : dog.frameIndex % 2 === 0
        ? assets.dogRun
        : assets.dogRunAlt;
    ctx.drawImage(dogSprite, dog.x, dog.y, dog.width, dog.height);

    const score = Math.floor(scoreRef.current);
    const highScore = Math.max(Math.floor(highScoreRef.current), score);

    ctx.save();
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(15,23,42,0.88)";
    ctx.font = "700 22px 'Pixelify Sans', system-ui";
    ctx.fillText(`SCORE ${formatScore(score)}`, width - 18, 34);
    ctx.fillStyle = "rgba(15,23,42,0.55)";
    ctx.font = "600 17px 'Pixelify Sans', system-ui";
    ctx.fillText(`HI ${formatScore(highScore)}`, width - 18, 58);
    ctx.restore();

    const gameState = gameStateRef.current;
    if (gameState === "ready") {
      ctx.save();
      ctx.font = "600 20px 'Pixelify Sans', system-ui";
      ctx.fillStyle = "rgba(15,23,42,0.55)";
      ctx.textAlign = "center";
      ctx.fillText("Tap or press space to start", width / 2, CANVAS_HEIGHT - 72);
      ctx.restore();
    } else if (gameState === "over") {
      ctx.save();
      ctx.font = "700 26px 'Pixelify Sans', system-ui";
      ctx.fillStyle = "rgba(15,23,42,0.9)";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", width / 2, CANVAS_HEIGHT / 2 - 10);
      ctx.font = "600 18px 'Pixelify Sans', system-ui";
      ctx.fillStyle = "rgba(15,23,42,0.6)";
      ctx.fillText(
        "Tap or press space to try again",
        width / 2,
        CANVAS_HEIGHT / 2 + 22,
      );
      ctx.restore();
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(CANVAS_HEIGHT * dpr);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    ctxRef.current = context;

    renderScene();
  }, [renderScene]);

  const resetGameState = useCallback(() => {
    const dog = dogRef.current;
    dog.x = 56;
    dog.y = FLOOR_Y - dog.height;
    dog.vy = 0;
    dog.isJumping = false;
    dog.frameTimer = 0;
    dog.frameIndex = 0;

    obstaclesRef.current = [];
    backgroundsRef.current = [];
    spawnTimerRef.current = 0;
    nextSpawnDelayRef.current = BASE_SPAWN_DELAY + Math.random() * 0.4;
    mountainTimerRef.current = 0;
    nextMountainDelayRef.current = INITIAL_MOUNTAIN_DELAY;
    scoreRef.current = 0;
    lastTimeRef.current = 0;
  }, []);

  const updateHighScore = useCallback(() => {
    const score = Math.floor(scoreRef.current);
    if (score > highScoreRef.current) {
      highScoreRef.current = score;
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            HIGH_SCORE_STORAGE_KEY,
            String(highScoreRef.current),
          );
        } catch {
          // Ignore storage failures (e.g. private mode).
        }
      }
    }
  }, []);

  const endGame = useCallback(() => {
    if (gameStateRef.current !== "running") {
      return;
    }
    updateHighScore();
    gameStateRef.current = "over";
    cancelAnimation();
    renderScene();
  }, [renderScene, updateHighScore]);

  const updateGame = useCallback(
    (delta: number, width: number) => {
      if (gameStateRef.current !== "running") {
        return;
      }

      const dog = dogRef.current;
      dog.vy += GRAVITY * delta;
      dog.y += dog.vy * delta;

      if (dog.y + dog.height >= FLOOR_Y) {
        dog.y = FLOOR_Y - dog.height;
        dog.vy = 0;
        dog.isJumping = false;
      }

      if (!dog.isJumping) {
        dog.frameTimer += delta;
        if (dog.frameTimer >= DOG_FRAME_DURATION) {
          dog.frameTimer = 0;
          dog.frameIndex = (dog.frameIndex + 1) % 2;
        }
      } else {
        dog.frameTimer = 0;
        dog.frameIndex = 0;
      }

      const assets = assetsRef.current;
      if (!assets) {
        return;
      }

      const randomBetween = (min: number, max: number) =>
        min + Math.random() * (max - min);

      const difficultyNormalized = Math.min(scoreRef.current / 900, 1);
      const currentSpeed =
        BASE_SPEED + difficultyNormalized * (MAX_SPEED - BASE_SPEED);

      spawnTimerRef.current += delta;
      const earlyEase = Math.max(0, 1 - scoreRef.current / 320);
      let minDelay =
        MIN_SPAWN_DELAY + earlyEase * 0.7 - difficultyNormalized * 0.25;
      minDelay = Math.max(minDelay, MIN_SPAWN_DELAY);
      let maxDelay =
        BASE_SPAWN_DELAY + 0.6 + earlyEase * 1.1 - difficultyNormalized * 0.55;
      if (maxDelay < minDelay + 0.25) {
        maxDelay = minDelay + 0.25;
      }

      if (spawnTimerRef.current >= nextSpawnDelayRef.current) {
        spawnTimerRef.current = 0;
        const lastObstacle = obstaclesRef.current.at(-1);
        const jumpWindow = Math.min(
          JUMP_TIME,
          0.55 + difficultyNormalized * 0.22,
        );
        const projectedTravel = currentSpeed * jumpWindow;
        const baseGap = Math.max(
          MIN_GAP_BASE,
          projectedTravel + 110 + earlyEase * 60,
        );

        let spawnBase = width + 48;
        if (lastObstacle) {
          const required =
            lastObstacle.x + lastObstacle.width + baseGap * 0.9;
          spawnBase = Math.max(spawnBase, required);
        }

        type PlannedObstacle = {
          sprite: HTMLImageElement;
          scale: number;
          offset: number;
        };

        const planPattern = (): PlannedObstacle[] => {
          const planned: PlannedObstacle[] = [];
          let cursor = 0;

          const push = (
            sprite: HTMLImageElement,
            scale: number,
            gapBefore = 0,
          ) => {
            cursor += gapBefore;
            planned.push({ sprite, scale, offset: cursor });
            const obstacleWidth = sprite.width * scale;
            cursor += obstacleWidth;
            return obstacleWidth;
          };

          const longGap = baseGap * 1.2 + randomBetween(24, 48);
          const standardGap = baseGap + randomBetween(-14, 24);
          const shortGap = Math.max(
            120,
            baseGap * 0.85 + randomBetween(-10, 10),
          );

          if (scoreRef.current < 220) {
            if (Math.random() < 0.6) {
              const scale = randomBetween(0.22, 0.27);
              push(assets.tree, scale);
            } else {
              const scale = randomBetween(0.17, 0.2);
              push(assets.squirrel, scale);
              if (Math.random() < 0.25) {
                push(
                  assets.squirrel,
                  scale * randomBetween(0.95, 1.05),
                  longGap,
                );
              }
            }
          } else if (scoreRef.current < 520) {
            const roll = Math.random();
            if (roll < 0.4) {
              const scale = randomBetween(0.21, 0.27);
              push(assets.tree, scale);
            } else if (roll < 0.7) {
              const scale = randomBetween(0.18, 0.22);
              push(assets.squirrel, scale);
              push(
                assets.squirrel,
                scale * randomBetween(0.92, 1.06),
                standardGap,
              );
            } else {
              const scale = randomBetween(0.2, 0.25);
              const width = push(assets.tree, scale);
              push(
                assets.squirrel,
                randomBetween(0.16, 0.19),
                Math.max(standardGap, width + standardGap * 0.3),
              );
            }
          } else {
            const roll = Math.random();
            if (roll < 0.35) {
              const scale = randomBetween(0.22, 0.28);
              push(assets.tree, scale);
              push(
                assets.tree,
                scale * randomBetween(0.88, 1.05),
                standardGap,
              );
            } else if (roll < 0.7) {
              const scale = randomBetween(0.18, 0.22);
              push(assets.squirrel, scale);
              push(
                assets.squirrel,
                scale * randomBetween(0.9, 1.1),
                standardGap,
              );
              if (Math.random() < 0.45) {
                push(
                  assets.squirrel,
                  scale * randomBetween(0.95, 1.15),
                  standardGap,
                );
              }
            } else {
              const groupCount = 3 + (Math.random() < 0.4 ? 1 : 0);
              for (let i = 0; i < groupCount; i += 1) {
                const sprite =
                  Math.random() > 0.5 ? assets.tree : assets.squirrel;
                const scale =
                  sprite === assets.tree
                    ? randomBetween(0.18, 0.24)
                    : randomBetween(0.16, 0.21);
                push(sprite, scale, i === 0 ? 0 : shortGap);
              }
            }
          }

          if (planned.length === 0) {
            planned.push({
              sprite: assets.tree,
              scale: 0.24,
              offset: 0,
            });
          }

          return planned;
        };

        const pattern = planPattern();

        const addObstacle = (
          sprite: HTMLImageElement,
          scale: number,
          offsetX = 0,
        ) => {
          const obstacleWidth = sprite.width * scale;
          const obstacleHeight = sprite.height * scale;
          const spawnX = spawnBase + offsetX;
          obstaclesRef.current.push({
            x: spawnX,
            y: FLOOR_Y - obstacleHeight,
            width: obstacleWidth,
            height: obstacleHeight,
            sprite,
          });
          return obstacleWidth;
        };

        pattern.forEach(({ sprite, scale, offset }) => {
          addObstacle(sprite, scale, offset);
        });

        const patternComplexity = Math.max(0, pattern.length - 1);
        nextSpawnDelayRef.current =
          randomBetween(minDelay, maxDelay) + patternComplexity * 0.18;
      }

      mountainTimerRef.current += delta;
      const mountainDelayRange = [
        Math.max(
          MOUNTAIN_SPAWN_DELAY_RANGE[0] - difficultyNormalized * 2.2,
          4.6,
        ),
        Math.max(
          MOUNTAIN_SPAWN_DELAY_RANGE[1] - difficultyNormalized * 1.8,
          7,
        ),
      ] as const;

      if (mountainTimerRef.current >= nextMountainDelayRef.current) {
        mountainTimerRef.current = 0;
        nextMountainDelayRef.current = randomBetween(
          mountainDelayRange[0],
          mountainDelayRange[1],
        );

        const shouldSkip =
          backgroundsRef.current.length > 0 && Math.random() < 0.45;
        if (shouldSkip) {
          // Skip this spawn to keep mountains feeling special.
        } else {
          const scale = randomBetween(0.52, 0.78);
          const widthScaled = assets.mountain.width * scale;
          const heightScaled = assets.mountain.height * scale;
          const yOffset = randomBetween(-8, 8);
          const spawnBuffer = Math.min(widthScaled * 0.45, 220);
          backgroundsRef.current.push({
            x: width + spawnBuffer,
            y: FLOOR_Y - heightScaled - yOffset,
            width: widthScaled,
            height: heightScaled,
            speed: MOUNTAIN_BASE_SPEED + difficultyNormalized * 52,
            sprite: assets.mountain,
          });
        }
      }

      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({
          ...obstacle,
          x: obstacle.x - currentSpeed * delta,
        }))
        .filter((obstacle) => obstacle.x + obstacle.width > -20);

      backgroundsRef.current = backgroundsRef.current
        .map((bg) => ({
          ...bg,
          x: bg.x - bg.speed * delta,
        }))
        .filter((bg) => bg.x + bg.width > -60);

      const dogLeft = dog.x + 8;
      const dogRight = dog.x + dog.width - 10;
      const dogTop = dog.y + 4;
      const dogBottom = dog.y + dog.height;

      for (const obstacle of obstaclesRef.current) {
        const obstacleLeft = obstacle.x + 4;
        const obstacleRight = obstacle.x + obstacle.width - 4;
        const obstacleTop = obstacle.y + 4;
        const obstacleBottom = obstacle.y + obstacle.height;

        const isColliding =
          dogLeft < obstacleRight &&
          dogRight > obstacleLeft &&
          dogTop < obstacleBottom &&
          dogBottom > obstacleTop;

        if (isColliding) {
          endGame();
          break;
        }
      }

      scoreRef.current += delta * (120 + difficultyNormalized * 90);
    },
    [endGame],
  );

  const step = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const delta =
        (timestamp - (lastTimeRef.current || timestamp)) / 1000 || 0.016;
      lastTimeRef.current = timestamp;

      updateGame(delta, canvas.clientWidth);
      renderScene();

      if (gameStateRef.current === "running") {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    },
    [renderScene, updateGame],
  );

  const startLoop = useCallback(() => {
    resetGameState();
    gameStateRef.current = "running";
    renderScene();
    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(step);
  }, [renderScene, resetGameState, step]);

  const handleAction = useCallback(() => {
    const gameState = gameStateRef.current;
    if (gameState === "loading") {
      return;
    }
      if (gameState === "ready" || gameState === "over") {
      dogRef.current.frameTimer = 0;
      dogRef.current.frameIndex = 0;
      startLoop();
      return;
    }
    if (gameState === "running") {
      const dog = dogRef.current;
      if (!dog.isJumping) {
        dog.vy = JUMP_VELOCITY;
        dog.isJumping = true;
      }
    }
  }, [startLoop]);

  useEffect(() => {
    let isCancelled = false;

    const setup = async () => {
      try {
        const assets = await loadAssets();
        if (isCancelled) return;
        assetsRef.current = assets;
        setIsReady(true);
      } catch (error) {
        console.error("Failed to load game assets", error);
        onExit();
      }
    };

    setup();

    return () => {
      isCancelled = true;
    };
  }, [onExit]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    resizeCanvas();
    resetGameState();
    gameStateRef.current = "ready";
    renderScene();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        handleAction();
      } else if (event.code === "Escape") {
        event.preventDefault();
        onExit();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      handleAction();
    };

    window.addEventListener("keydown", onKeyDown);
    const canvas = canvasRef.current;
    canvas?.addEventListener("pointerdown", onPointerDown);

    return () => {
      resizeObserver.disconnect();
      cancelAnimation();
      window.removeEventListener("keydown", onKeyDown);
      canvas?.removeEventListener("pointerdown", onPointerDown);
    };
  }, [handleAction, isReady, onExit, renderScene, resetGameState, resizeCanvas]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    if (!stored) {
      return;
    }
    const value = Number.parseInt(stored, 10);
    if (!Number.isNaN(value) && value > highScoreRef.current) {
      highScoreRef.current = value;
      renderScene();
    }
  }, [renderScene]);

  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${pixelFont.className} pointer-events-auto select-none`}
      style={{ height: `${CANVAS_HEIGHT}px` }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full bg-transparent"
        height={CANVAS_HEIGHT}
      />
    </div>
  );
}
