import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import {
  CalendarClock,
  ShieldUser,
  Stethoscope,
  User,
} from "lucide-react";

const Header = async () => {
  const user = await checkUser();
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4  h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/CallDoc_logo_small.png"
            alt="CallDoc Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain text-emerald-900"
          />
        </Link>

        <div className="flex items-center space-x-2">
          <SignedIn>
            {user?.role === "ADMIN" && (
              <Link href={"/admin"}>
                <Button
                  variant={"outline"}
                  className={
                    "hidden md:inline-flex items-center gap-2"
                  }>
                  <ShieldUser className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button
                  variant={"ghost"}
                  className={"md:hidden h-10 w-10 p-0"}>
                  <ShieldUser className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>
          <SignedIn>
            {user?.role === "DOCTOR" && (
              <Link href={"/doctor"}>
                <Button
                  variant={"outline"}
                  className={
                    "hidden md:inline-flex items-center gap-2"
                  }>
                  <Stethoscope className="h-4 w-4" />
                  Doctor Dashboard
                </Button>
                <Button
                  variant={"ghost"}
                  className={"md:hidden h-10 w-10 p-0"}>
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          <SignedIn>
            {user?.role === "PATIENT" && (
              <Link href={"/appointments"}>
                <Button
                  variant={"outline"}
                  className={
                    "hidden md:inline-flex items-center gap-2"
                  }>
                  <CalendarClock className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button
                  variant={"ghost"}
                  className={"md:hidden h-10 w-10 p-0"}>
                  <CalendarClock className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          <SignedIn>
            {user?.role === "UNASSIGNED" && (
              <Link href={"/onboarding"}>
                <Button
                  variant={"outline"}
                  className={
                    "hidden md:inline-flex items-center gap-2"
                  }>
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button
                  variant={"ghost"}
                  className={"md:hidden h-10 w-10 p-0"}>
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
