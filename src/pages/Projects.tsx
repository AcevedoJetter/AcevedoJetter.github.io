import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    id: "spotify",
    title: "Spotify Data Analysis",
    image: "images/spotify-song-format.png",
    alt: "Spotify song format",
    description:
      "Created a script which analyze the all-time data of your Spotify account. More information about this project, including the source code, can be found {link}.",
    link: "/projects/spotify-data-analysis",
  },
  {
    id: "pr-elections",
    title: "Puerto Rico General Elections",
    image: "images/gobernador-final.png",
    alt: "Map of Puerto Rico - Governor results",
    description:
      "Created a web scraper to get the precinct election data at a given moment. Used for the 2024 general elections. More information about this project can be found {link}.",
    link: "/projects/pr-elections-2024",
  },
  {
    id: "batted-ball",
    title: "Batted Ball Data Visualization",
    image: "images/batted-ball-data-viz.png",
    alt: "Batted Ball Data Visualization example",
    description:
      "Created a web application to visualize batted ball data from baseball games. More information about this project, including the source code, can be found {link}.",
    link: "/projects/batted-ball-data-viz",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Chat Formatter",
    image: "images/formatted-chat-example.png",
    alt: "Formatted Chat Example",
    description:
      "Takes in a txt file that contains the exported chat of a WhatsApp conversation and divides it by categories into a csv file. More information about this project, including the source code, can be found {link}.",
    link: "/projects/whatsapp-chat-formatter",
  },
  {
    id: "mail-merger",
    title: "Mail Merger",
    image: "images/mail-merger-example.png",
    alt: "people.txt example",
    description:
      "Using the smtplib and email.message modules, created a Python script that can send personalized emails. More information about this project, including the source code, can be found {link}.",
    link: "/projects/mail-merger",
  },
  {
    id: "mastermind",
    title: "Mastermind Game and Solver",
    image: "images/mastermind-example.png",
    alt: "mastermind game example",
    description:
      "Implemented the board game of Mastermind and will create a solver which uses the Five-guess algorithm. More information about this project, including the source code, can be found {link}.",
    link: "/projects/mastermind",
  },
  {
    id: "personal-website",
    title: "Personal Website",
    image: "images/personal-website.png",
    alt: "acevedojetter.com main page",
    description:
      "This website was created using React, TypeScript, and Vite. More information about my Personal Website, including the source code, can be found {link}.",
    link: "/projects/personal-website",
  },
];

export default function Projects() {
  return (
    <>
      <div className="projects">
        {projects.map((project) => (
          <article key={project.id}>
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.alt} />
            <p>
              {project.description.split("{link}")[0]}
              <Link to={project.link}>here</Link>
              {project.description.split("{link}")[1]}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
