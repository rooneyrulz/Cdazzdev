import Link from "next/link";
import { FaHouseDamage } from "react-icons/fa";
import { getServerSession } from "next-auth";
import NavLink from "./NavLink";

const NavBar = async () => {
  const session = await getServerSession();

  return (
    <nav className="flex space-x-8 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaHouseDamage size={32} />
      </Link>
      <NavLink session={session} />
    </nav>
  );
};

export default NavBar;
