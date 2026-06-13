import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const location = useLocation();
  const is404 = title === "404";
  const isHome = !is404 && location.pathname === "/";

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo">
          Kevin E. Acevedo Jetter
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={!is404 && location.pathname === "/" ? "current" : ""}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={
              !is404 &&
              (location.pathname === "/projects" ||
                location.pathname.startsWith("/projects/"))
                ? "current"
                : ""
            }
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={
              !is404 && location.pathname === "/contact" ? "current" : ""
            }
          >
            Contact
          </Link>
        </div>
      </nav>
      <main>
        {!isHome && <h1 className="page-title">{title}</h1>}
        {children}
      </main>
      {/* <footer>
        <p>© {new Date().getFullYear()} Kevin E. Acevedo Jetter</p>
      </footer> */}
    </>
  );
}
