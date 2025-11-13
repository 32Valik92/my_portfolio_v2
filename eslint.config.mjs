import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      // НЕ додаємо react або @typescript-eslint — вони вже є
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // === ТВОЇ БАЗОВІ ПРАВИЛА ===
      indent: ["error", 2], // 2 пробіли для відступів
      "linebreak-style": ["error", "unix"], // Завжди LF (\n), а не CRLF (\r\n)
      quotes: ["error", "double"], // Використовувати подвійні лапки для рядків
      semi: ["error", "always"], // Вимагати крапку з комою після кожного виразу
      "no-console": "off", // Дозволити console.log (зручно для дебагу)
      "simple-import-sort/imports": "error", // Автоматично сортувати імпорти за групами
      "simple-import-sort/exports": "error", // Автоматично сортувати експорти
      "no-multiple-empty-lines": [
        "error",
        { max: 2, maxEOF: 1, maxBOF: 0 },
      ], // Не більше 2 пустих рядків між блоками, 1 в кінці файлу, 0 на початку

      // === ДОДАТКОВІ КОРИСНІ ===
      "react/react-in-jsx-scope": "off", // У Next.js не потрібно імпортувати React
      "react/jsx-uses-react": "off", // Вимкнено, бо новий JSX не вимагає React
      "react/jsx-uses-vars": "error", // Якщо компонент використовується в JSX — він не "unused"
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ], // Якщо змінна починається з "_", ESLint не буде сваритися що вона не використана
      "object-curly-spacing": ["error", "always"], // Пробіли всередині обʼєктів: { foo: "bar" }
      "array-bracket-spacing": ["error", "never"], // Масиви без пробілів: [1, 2, 3]
      "comma-dangle": ["error", "always-multiline"], // Якщо обʼєкт/масив в кілька рядків → останній елемент з комою
    },


    settings: {
      react: { version: "detect" },
    },
  },

  // Ігнори
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
