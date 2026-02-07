import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import SpotifyDataAnalysis from "./pages/projects/SpotifyDataAnalysis";
import PRElections2024 from "./pages/projects/PRElections2024";
import BattedBallDataViz from "./pages/projects/BattedBallDataViz";
import WhatsAppChatFormatter from "./pages/projects/WhatsAppChatFormatter";
import MailMerger from "./pages/projects/MailMerger";
import Mastermind from "./pages/projects/Mastermind";
import PersonalWebsite from "./pages/projects/PersonalWebsite";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Kevin E. Acevedo Jetter">
              <About />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout title="Projects">
              <Projects />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout title="Contact">
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/projects/spotify-data-analysis"
          element={
            <Layout title="Spotify Data Analysis">
              <SpotifyDataAnalysis />
            </Layout>
          }
        />
        <Route
          path="/projects/pr-elections-2024"
          element={
            <Layout title="Puerto Rico General Elections">
              <PRElections2024 />
            </Layout>
          }
        />
        <Route
          path="/projects/batted-ball-data-viz"
          element={
            <Layout title="Batted Ball Data Visualization">
              <BattedBallDataViz />
            </Layout>
          }
        />
        <Route
          path="/projects/whatsapp-chat-formatter"
          element={
            <Layout title="WhatsApp Chat Formatter">
              <WhatsAppChatFormatter />
            </Layout>
          }
        />
        <Route
          path="/projects/mail-merger"
          element={
            <Layout title="Mail Merger">
              <MailMerger />
            </Layout>
          }
        />
        <Route
          path="/projects/mastermind"
          element={
            <Layout title="Mastermind Game and Solver">
              <Mastermind />
            </Layout>
          }
        />
        <Route
          path="/projects/personal-website"
          element={
            <Layout title="Personal Website">
              <PersonalWebsite />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout title="404">
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
