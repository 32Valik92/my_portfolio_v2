"use client";
import { Bodies, Body, Engine, World } from "matter-js";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

// Визначення константи для розміру літери, щоб легко змінювати глобально
const LETTER_SIZE = 80;

// Масив базових літер
const baseLetters = [
  { char: "O", delay: 0.1, xRel: 1.05, yRel: 1.15, endRot: -37 },
  { char: "T", delay: 0.3, xRel: 1.15, yRel: 0.7, endRot: -24 },
  { char: "O", delay: 0.5, xRel: 0.65, yRel: 0.85, endRot: -37 },
  { char: "L", delay: 0.7, xRel: 0.5, yRel: 1.22, endRot: 135 },
  { char: "I", delay: 0.9, xRel: 0.15, yRel: 1.3, endRot: 95 },
  { char: "F", delay: 1.1, xRel: 0.05, yRel: 1.1, endRot: 29 },
  { char: "R", delay: 1.3, xRel: 1.05, yRel: 0.25, endRot: -8 },
  { char: "O", delay: 1.5, xRel: 0.5, yRel: 0.4, endRot: -37 },
  { char: "P", delay: 1.7, xRel: 0.13, yRel: 0.62, endRot: -45 },
] as const;

const HomeHero = () => {
  const t = useTranslations("home.hero");

  const orangeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = orangeRef.current;
    if (!container || !canvasRef.current) return;

    const rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    const engine = Engine.create();
    engine.gravity.y = 0.3;
    engine.gravity.x = 0;

    const world = engine.world;

    const FLOOR_HEIGHT = 80;
    const floor = Bodies.rectangle(
      width / 2,
      height + FLOOR_HEIGHT / 2,
      width + 200,
      FLOOR_HEIGHT,
      {
        isStatic: true,
        restitution: 0.12,
        friction: 0.5,
      },
    );

    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, {
      isStatic: true,
    });

    World.add(world, [floor, leftWall, rightWall]);

    const quarterW = width * 0.5;
    const quarterH = height * 0.5;
    const quarterX = width - quarterW - 20;
    const quarterY = height - quarterH - LETTER_SIZE;

    const bodies: Body[] = [];
    const attractors: { targetX: number; targetY: number; targetAngle: number }[] = [];

    baseLetters.forEach((letter, i) => {
      const targetX = quarterX + letter.xRel * (quarterW - LETTER_SIZE);
      const targetY = quarterY + letter.yRel * (quarterH - LETTER_SIZE);

      attractors.push({
        targetX,
        targetY,
        targetAngle: (letter.endRot * Math.PI) / 180,
      });

      const startX = width * 0.1 + Math.random() * 120;
      const startY = -200 - i * 80;

      const body = Bodies.rectangle(startX, startY, LETTER_SIZE, LETTER_SIZE, {
        restitution: 0.25,
        friction: 0.4,
        frictionAir: 0.008,
        density: 0.002,
        chamfer: { radius: 20 },
        angle: Math.random() * Math.PI * 2,
      });

      Body.setVelocity(body, {
        x: 1.5 + Math.random() * 2.5,
        y: -0.5 + Math.random(),
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      bodies.push(body);
    });

    World.add(world, bodies);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;

    // 👇 NEW: стан миші для анти-магніта
    const mouse = {
      x: 0,
      y: 0,
      active: false,
    };

    const handleMouseEnter = () => {
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      Engine.update(engine, 1000 / 60);

      bodies.forEach((body, i) => {
        const attr = attractors[i];

        const dx = attr.targetX - body.position.x;
        const dy = attr.targetY - body.position.y;
        const dist = Math.hypot(dx, dy);

        const maxDist = 400;
        const strength = 0.0004;
        if (dist < maxDist) {
          const force = strength * (1 - dist / maxDist);
          Body.applyForce(body, body.position, {
            x: dx * force,
            y: dy * force,
          });
        }

        if (dist < 120) {
          const angleDiff = attr.targetAngle - body.angle;
          Body.setAngularVelocity(
            body,
            body.angularVelocity * 0.9 + angleDiff * 0.012,
          );
          Body.setVelocity(body, {
            x: body.velocity.x * 0.94,
            y: body.velocity.y * 0.94,
          });
        }

        // 👇 NEW: анти-магніт навколо курсора + легка тряска
        if (mouse.active) {
          if (body.isStatic) {
            Body.setStatic(body, false);
          }

          const mdx = body.position.x - mouse.x;
          const mdy = body.position.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          // менший радіус впливу
          const maxMouseDist = 140;

          if (mdist > 0 && mdist < maxMouseDist) {
            const factor = 1 - mdist / maxMouseDist;

            const repelStrength = 0.00025;

            const jitter = 0.3 + Math.random() * 0.3;

            const nx = mdx / mdist;
            const ny = mdy / mdist;

            Body.applyForce(body, body.position, {
              x: nx * repelStrength * factor * jitter,
              y: ny * repelStrength * factor * jitter,
            });

            Body.setAngularVelocity(
              body,
              body.angularVelocity + (Math.random() - 0.5) * 0.01,
            );
          }
        }

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = "900 170px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 10;
        ctx.fillText(baseLetters[i].char, 0, 0);
        ctx.restore();
      });

      raf = requestAnimationFrame(render);
    };

    render();

    const lockTimeout = setTimeout(() => {
      bodies.forEach(b => Body.setStatic(b, true));
    }, 5000);

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      width = newRect.width;
      height = newRect.height;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(lockTimeout);
      window.removeEventListener("resize", handleResize);

      // 👇 NEW: прибираємо слухачі миші
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);

      World.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="relative w-full h-auto lg:h-[calc(100vh-90px)] pt-[30px] pb-[50px] flex flex-col lg:flex-row items-center gap-[40px] text-[var(--white)]">
      {/* ЛІВА СТОРОНА */}
      <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-[20px] md:gap-[48px]">
        <div className="relative w-full max-w-[360px] md:max-w-[600px] ml-auto">
          <Image
            src="/images/hero/hero_me.webp"
            alt={t("photoAlt")}
            width={725}
            height={749}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="w-full flex flex-col text-center md:text-right font-semibold text-[16px] md:text-[35px] gap-[6px] md:gap-0 tracking-[1px] uppercase leading-[35px]">
          <span>{t("tagName")}</span>
          <span>{t("tagRole")}</span>
        </div>
      </div>
      {/* ПРАВА СТОРОНА */}
      <div className="hidden sm:flex w-full max-w-[680px] lg:w-[50%] justify-center relative h-full">
        <div
          ref={orangeRef}
          className="relative w-full max-w-[680px] md:max-w-none h-[700px] lg:h-full bg-[var(--main-first)] rounded-[25px] md:rounded-[35px] overflow-hidden pt-[20px] pl-[20px] md:pt-[30px] md:pl-[30px]"
        >
          <div className="text-[var(--white)] font-extrabold text-[80px] md:text-[100px] leading-[75px]">
            <div>20</div>
            <div>25</div>
          </div>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
