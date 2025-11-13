// createNavigation — це фабрика з next-intl, яка створює обгортки
// навігаційних API Next.js з урахуванням нашої конфігурації локалей.
// Важливо: ці обгортки автоматично додають/зчитують префікс локалі в шляхах.
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Викликаємо фабрику з нашим routing і отримуємо локалізовані аналоги
// звичних API. Коротко про кожен:
// - Link: компонент <Link>, який сам додає /{locale} до href.
// - redirect: серверна утиліта, яка робить редірект з урахуванням локалі.
// - usePathname: React-хук, що повертає pathname БЕЗ префікса локалі
//   (зручно порівнювати маршрути незалежно від мови).
// - useRouter: локалізований useRouter (push/replace також враховують локаль).
// - getPathname: серверна функція-аналог usePathname (для серверних компонентів/дій).
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
