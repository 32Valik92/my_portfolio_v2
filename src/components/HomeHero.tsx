"use client";
import { Bodies, Body, Engine, World } from "matter-js";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

// Визначення константи для розміру літери, щоб легко змінювати глобально
const LETTER_SIZE = 80;

// Масив базових літер: Визначає літери для симуляції, разом з затримками анімації,
// відносними позиціями (xRel, yRel) в цільовій зоні та фінальними кутами повороту (endRot в градусах).
// xRel та yRel — множники (зазвичай між 0 та 1.3) для розкидання літер в цільовій зоні.
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

  // Рефи для елементів DOM: orangeRef — контейнер div для симуляції, canvasRef — канвас, де малюються літери.
  const orangeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Отримання елемента контейнера та його розмірів. Якщо недоступно, виходимо.
    const container = orangeRef.current;
    if (!container || !canvasRef.current) return;

    // Отримання початкової ширини та висоти з bounding rect контейнера(орандевого).
    const rect = container.getBoundingClientRect(); // getBoundingClientRect - для отримання координат та розмірів
    let width = rect.width;
    let height = rect.height;

    // Створення двигуна Matter.js та світу.
    // Двигун керує оновленнями фізики, світ містить всі тіла.
    const engine = Engine.create();
    // Встановлення гравітації: y=0.3 для посиленого притягнення вниз (для швидшого осідання), x=0 без горизонтальної гравітації.
    engine.gravity.y = 0.3;
    engine.gravity.x = 0;

    const world = engine.world;

    // Створення статичних меж:
    const FLOOR_HEIGHT = 80;
    // - Підлога: М'яка підлога внизу для ловлі літер, з низькою пружністю (відскоком) та високим тертям.
    // у Bodies.rectangle(...) (координата X, координата Y, ширина, висота, опції)
    const floor = Bodies.rectangle(
      width / 2,
      height + FLOOR_HEIGHT / 2, // центр підлоги нижче канвасу
      width + 200,
      FLOOR_HEIGHT,
      {
        isStatic: true,
        restitution: 0.12,
        friction: 0.5,
      },
    );

    // - Ліва та права стіни: Невидимі стіни для утримання літер в контейнері.
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });

    // Додавання меж до світу.
    World.add(world, [floor, leftWall, rightWall]);

    // Визначення цільової зони для осідання літер: Це приблизно нижня права "чверть" контейнера.
    // Однак, розмір задано як половину ширини/висоти для більшого простору, з офсетами для кращого візуального розміщення.
    // quarterW та quarterH: Половину розмірів контейнера.
    const quarterW = width * 0.5;
    const quarterH = height * 0.5;

    // quarterX: Початкова x-позиція цільової зони.
    // Розраховується як (width - quarterW - 20), що позиціонує її в правій половині, зсуненою ліворуч на 5px для відступу.
    const quarterX = width - quarterW - 20;

    // quarterY: Початкова y-позиція цільової зони.
    // Розраховується як (height - quarterH - (LETTER_SIZE + 20)), що позиціонує її в нижній половині,
    // зсуненою вгору на (LETTER_SIZE + 20) для врахування розміру літери та додаткового відступу.
    // Це забезпечує, щоб літери не вилазили за нижній край.
    // Для кастомізації: Змінюйте -(LETTER_SIZE + 20) — зробіть число більшим (наприклад, +40) для підняття зони вище,
    // або меншим (наприклад, +10) для опускання нижче. LETTER_SIZE = 80, тому офсет ~100px.
    const quarterY = height - quarterH - (LETTER_SIZE);

    // Масиви для тіл фізики (літер) та їх цільових атракторів.
    const bodies: Body[] = [];
    const attractors: { targetX: number; targetY: number; targetAngle: number }[] = [];

    // Цикл по кожній літері в baseLetters для створення тіл та цілей.
    baseLetters.forEach((letter, i) => {
      // Розрахунок цільової позиції:
      // targetX = quarterX + (letter.xRel * (quarterW - LETTER_SIZE))
      // Це масштабує xRel (0-1+) по доступній ширині (quarterW мінус LETTER_SIZE, щоб уникнути переповнення).
      // Аналогічно для targetY.
      // Для кастомізації позиціонування:
      // - Змінюйте xRel/yRel в масиві baseLetters для окремих літер.
      // - Змінюйте (quarterW - LETTER_SIZE): Зменште віднімання LETTER_SIZE (наприклад, LETTER_SIZE/2) для більшого розкиду.
      // - Якщо хочете іншу форму (не прямокутну), додайте кастомні офсети тут для кожної літери.
      const targetX = quarterX + letter.xRel * (quarterW - LETTER_SIZE);
      const targetY = quarterY + letter.yRel * (quarterH - LETTER_SIZE);

      // Збереження цільової позиції та кута (перетвореного в радіани для Matter.js).
      attractors.push({
        targetX,
        targetY,
        targetAngle: (letter.endRot * Math.PI) / 180,
      });

      // Початкова позиція: Високо над канвасом (негативне y) та трохи ліворуч, зсунена по індексу для послідовного падіння.
      const startX = width * 0.1 + Math.random() * 120; // Випадкове x в лівій зоні.
      const startY = -200 - i * 80; // Зсунене y для затриманого входу.

      // Створення прямокутного тіла для літери: Розмір LETTER_SIZE x LETTER_SIZE.
      const body = Bodies.rectangle(startX, startY, LETTER_SIZE, LETTER_SIZE, {
        restitution: 0.25, // Помірна пружність.
        friction: 0.4, // Тертя на поверхнях.
        frictionAir: 0.008, // Низький опір повітря для повільного падіння.
        density: 0.002, // Низька щільність для "плавного" відчуття.
        chamfer: { radius: 20 }, // Заокруглені кути для гладкого вигляду/колізій.
        angle: Math.random() * Math.PI * 2, // Випадковий початковий поворот.
      });

      // Застосування початкової швидкості: М'який поштовх праворуч та невелика варіація вгору/вниз, плюс випадкове обертання.
      // Для кастомізації швидкості/поведінки падіння: Збільште x-швидкість для швидшого горизонтального руху.
      Body.setVelocity(body, {
        x: 1.5 + Math.random() * 2.5,
        y: -0.5 + Math.random(),
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      bodies.push(body);
    });

    // Додавання всіх тіл літер до світу.
    World.add(world, bodies);

    // Налаштування канвасу для рендерингу.
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = width;
    canvas.height = height;

    // Цикл анімації: Виконується ~60fps за допомогою requestAnimationFrame.
    let raf: number;
    const render = () => {
      // Очищення канвасу кожного кадру. Інакше ми бачимо шлейф(шлях), який проходить кожна буква
      ctx.clearRect(0, 0, width, height);

      // Оновлення двигуна фізики (фіксований крок часу для стабільності).
      Engine.update(engine, 1000 / 60);

      // Для кожного тіла (літери):
      bodies.forEach((body, i) => {
        const attr = attractors[i];

        // Розрахунок відстані до цілі.
        const dx = attr.targetX - body.position.x;
        const dy = attr.targetY - body.position.y;
        const dist = Math.hypot(dx, dy);

        // Застосування сили притягнення: Сильніша ближче (обернено до відстані).
        // maxDist: Поріг для початку притягнення (500px).
        // strength: Базовий множник сили (0.0005, посилений для швидшого осідання).
        // Для кастомізації: Збільште strength для швидшого притягнення, або maxDist для раннього притягнення.
        const maxDist = 400;
        const strength = 0.0004;
        if (dist < maxDist) {
          const force = strength * (1 - dist / maxDist);
          Body.applyForce(body, body.position, {
            x: dx * force,
            y: dy * force,
          });
        }

        // Коли близько (dist < 120): Згасання швидкості та вирівнювання повороту.
        // Згасання: Множення швидкості на 0.94 для поступового уповільнення.
        // Поворот: Корекція кутової швидкості до цільового кута.
        // Для кастомізації: Змініть 120 на більше значення для раннього згасання, або множники для швидкості.
        if (dist < 120) {
          const angleDiff = attr.targetAngle - body.angle;
          Body.setAngularVelocity(body, body.angularVelocity * 0.9 + angleDiff * 0.012);
          Body.setVelocity(body, {
            x: body.velocity.x * 0.94,
            y: body.velocity.y * 0.94,
          });
        }

        // Рендеринг літери на канвасі:
        // Переміщення/поворот до позиції/кута тіла, потім малювання тексту.
        // Шрифт, колір, тінь для візуального стилю.
        // Примітка: Літери малюються як текст, а не зображення, для простоти.
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = "900 170px Arial"; // Розмір шрифту більший за LETTER_SIZE для візуального ефекту (змінюйте за потребою).
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 10;
        ctx.fillText(baseLetters[i].char, 0, 0);
        ctx.restore();
      });

      // Планування наступного кадру.
      raf = requestAnimationFrame(render);
    };

    // Запуск циклу рендерингу.
    render();

    // Фіксація тіл статичними через 5 секунд: Зупинка всього руху після осідання.
    // Для кастомізації: Змініть тривалість таймауту, якщо літерам потрібно більше/менше часу для осідання.
    const lockTimeout = setTimeout(() => {
      bodies.forEach(b => Body.setStatic(b, true));
    }, 5000);

    // Обробник ресайзу: Оновлення розмірів при зміні вікна.
    // Примітка: Межі не оновлюються при ресайзі — якщо потрібно, перестворіть їх.
    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      width = newRect.width;
      height = newRect.height;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Очищення: Зупинка анімації, очищення таймаутів, видалення слухачів, очищення світу/двигуна.
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(lockTimeout);
      window.removeEventListener("resize", handleResize);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, []); // Пустий масив залежностей: Виконується тільки при монтуванні.

  return (
    <div className="w-full h-auto lg:h-[calc(100vh-90px)] py-[30px] flex flex-col lg:flex-row items-center gap-[40px] text-[var(--white)]">
      {/* ЛІВА СТОРОНА */}
      <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-[20px] md:gap-[48px]">
        <div className="relative w-full max-w-[360px] md:max-w-none mx-auto">
          <Image src="/images/hero/hero_me.png" alt={t("photoAlt")} width={725} height={749} className="w-full h-auto object-contain" priority />
        </div>
        <div className="w-full flex flex-col text-center md:text-right font-semibold text-[16px] md:text-[35px] gap-[6px] md:gap-[10px] tracking-[1px] uppercase">
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
          {/* Статичний текстовий оверлей (наприклад, "20 25" — можливо, рік або код). */}
          <div className="text-white font-extrabold text-[80px] md:text-[100px] leading-[75px]">
            <div>20</div>
            <div>25</div>
          </div>
          {/* Канвас для динамічного рендерингу літер, абсолютне позиціонування для покриття div. */}
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