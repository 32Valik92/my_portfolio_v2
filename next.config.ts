// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
};

const withNextIntl = createNextIntlPlugin();

// ВАЖЛИВО: експортуємо конфіг обгорнутий плагіном
export default withNextIntl(nextConfig);
