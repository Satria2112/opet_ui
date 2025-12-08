import "./globals.css";
import AppLayout from "../components/layout/AppLayout";

export const metadata = {
  title: "OPET FINANCE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <div id="sidebar-flyout-root"></div>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
