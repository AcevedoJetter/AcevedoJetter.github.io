import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const location = useLocation();
  const is404 = title === "404";

  return (
    <>
      <h1>{title}</h1>
      <nav>
        <Link
          to="/"
          className={is404 || location.pathname === "/" ? "current" : ""}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={
            is404 ||
            location.pathname === "/projects" ||
            location.pathname.startsWith("/projects/")
              ? "current"
              : ""
          }
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className={is404 || location.pathname === "/contact" ? "current" : ""}
        >
          Contact
        </Link>
      </nav>
      {children}
      <hr />
    </>
  );
}
