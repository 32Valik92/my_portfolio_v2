// hasLocale — невеличка утиліта, що перевіряє чи значення входить у список підтримуваних локалей.
import { hasLocale } from "next-intl";
// getRequestConfig — головна точка налаштування next-intl на сервері.
// Вона дозволяє динамічно вибирати локаль і завантажувати переклади
// для кожного реквесту.
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

// Експортуємо за замовчуванням результат getRequestConfig.
// ВСЯ логіка визначення локалі і завантаження повідомлень (messages)
// відбувається всередині переданої async-функції.
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale — це проміс з локаллю, яку next-intl витягнув з:
  // - сегмента URL `[locale]`, якщо він є,
  // - або з заголовків/налаштувань (залежно від конфігурації).
  // Тут ми просто чекаємо значення.
  const requested = await requestLocale;

  // Якщо requested входить до списку підтримуваних локалей — використовуємо її,
  // інакше — підставляємо дефолтну з нашої конфігурації (у нас це 'ua').
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Повертаємо об’єкт конфігурації для next-intl:
  // - locale: вибрана нами локаль;
  // - messages: JSON з перекладами для цієї локалі.
  //   Зверни увагу: імпорт динамічний (import(...)),
  //   тому для кожної мови зіб’ється окремий чанк.
  //   Файли повинні лежати в `src/messages/{locale}.json`.
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
