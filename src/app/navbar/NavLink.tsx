"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { FaArrowRight, FaUserAlt } from "react-icons/fa";
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

export default function NavLink() {
  const currentPath = usePathname();
  const { data: session, status: sessionStatus } = useSession();

  const links: LinkType[] = [
    ...(session
      ? [
          { label: "Profile", href: "/profile", icon: <FaUserAlt /> },
          {
            label: "Logout",
            href: "",
            onClick: () => signOut(),
          },
        ]
      : [
          { label: "Register", href: "/register" },
          { label: "Login", href: "/login", icon: <FaArrowRight /> },
        ]),
  ];

  return (
    sessionStatus !== "loading" && (
      <div className="flex space-x-6 w-[100%]">
        <ul className="flex space-x-6 mr-auto">
          <Link
            href="/"
            className={`${
              currentPath === "/" ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
          >
            Home
          </Link>
        </ul>
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
      </div>
    )
  );
}
