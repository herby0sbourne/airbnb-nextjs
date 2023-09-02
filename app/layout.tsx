import { Nunito } from "next/font/google";

import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUserData = {
    id: "vsvsvs",
    name: null,
    email: null,
    emailVerified: null,
    image: null,
    hashedPassword: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    favoriteIds: []
  };

  const currentUser = process.env.NEXT_PUBLIC_DEVELOPMENT
    ? currentUserData
    : await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
