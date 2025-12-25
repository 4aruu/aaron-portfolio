import "./globals.css";
import SectionIndicator from "@/components/Navigation/SectionIndicator";

export const metadata = {
  title: "Aaron Jacob Sunil",
  description: "Systems in motion — portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <SectionIndicator />
        {children}
      </body>
    </html>
  );
}
