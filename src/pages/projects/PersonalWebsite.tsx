export default function PersonalWebsite() {
  return (
    <>
      <img
        className="description"
        src="../images/personal-website.png"
        alt="acevedojetter.com main page"
      />

      <p>
        This website was created originally with simple HTML but later changed
        to use React, TypeScript, and Vite. It is hosted on
        <a
          href="https://pages.github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          GitHub Pages
        </a>
        .
      </p>

      <p>
        You can find information about me in the Home page, projects I have
        completed or still in progress in the Projects page, and different ways
        to connect with me in the Contact Page.
      </p>

      <p>
        The source code can be found
        <a
          href="https://github.com/AcevedoJetter/AcevedoJetter.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          here
        </a>
        .
      </p>
    </>
  );
}
