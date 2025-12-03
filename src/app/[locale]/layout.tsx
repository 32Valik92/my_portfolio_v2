import "./globals.css";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "Strukalo Valentyn",
  icons: {
    icon: "/favicon.svg",
  },
};

type Props = {
	children?: ReactNode;
	params: Promise<{ locale: string }>;
}
export default async function RootLayout({ children, params }: Props) {

  const { locale } = await params;

  let messages;

  try {
    messages = await getMessages();
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="min-h-[100vh] bg-[var(--main-back)] text-[var(--white)]">
        <NextIntlClientProvider locale={locale} messages={messages}>

          <Header/>

          <main className="w-full flex flex-col items-center">
            {children}
          </main>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}