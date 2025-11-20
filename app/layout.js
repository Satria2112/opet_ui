import "./globals.css";
import AppLayout from "../components/layout/AppLayout";

export const metadata = {
  title: "MU Finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        {/* Portal untuk flyout sidebar */}
        <div id="sidebar-flyout-root"></div>

        {/* Semua page dibungkus AppLayout */}
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
