"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { FaArrowRight, FaHouseDamage } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";

type LinkType = {
  label: string;
  href: string;
  private?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

const NavBar = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();

  console.log(currentPath);

  const links: LinkType[] = [
    { label: "Home", href: "/"},
    ...(session
      ? [
          { label: "Profile", href: "/profile", private: true },
          {
            label: "Logout",
            href: "",
            private: true,
            onClick: () => signOut(),
          },
        ]
      : [
          { label: "Register", href: "/register" },
          { label: "Login", href: "/login", icon: <FaArrowRight /> },
        ]),
  ];

  return (
    <nav className="flex space-x-8 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><FaHouseDamage size={32} /></Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
            onClick={link?.onClick}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
