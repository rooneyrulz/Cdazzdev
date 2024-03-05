"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { signOut } from "next-auth/react";

type LinkType = {
  label: string;
  href: string;
  private?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function NavLink({ session }: any) {
  const currentPath = usePathname();

  const links: LinkType[] = [
    { label: "Home", href: "/" },
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
  );
}
