import { useEffect, useState } from "react";
import * as d3 from "d3";
import BaseballField from "../../components/BaseballField";
import type {
  BattedBallData,
  ProcessedBattedBallData,
} from "../../types/battedBallData";
import "./BattedBallDataViz.css";

export default function BattedBallDataViz() {
  const [data, setData] = useState<ProcessedBattedBallData[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("all");
  const [selectedBatter, setSelectedBatter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.csv<BattedBallData>("/data/batted_ball_data.csv", d3.autoType).then(
      (rawData) => {
        const processedData: ProcessedBattedBallData[] = rawData.map((d) => ({
          ...d,
          PLAY_OUTCOME: d.PLAY_OUTCOME.trim().toLowerCase(),
          BATTER: d.BATTER.trim(),
        }));
        setData(processedData);
        setLoading(false);
      },
    );
  }, []);

  const outcomes = [
    "all",
    "single",
    "double",
    "triple",
    "homerun",
    "error",
    "fielderschoice",
    "sacrifice",
    "out",
    "undefined",
  ];

  const formatOutcomeLabel = (outcome: string): string => {
    if (outcome === "all") return "All";
    if (outcome === "fielderschoice") return "Fielders Choice";
    if (outcome === "undefined") return "Foul Ball";
    if (outcome === "homerun") return "Home Run";
    return outcome.charAt(0).toUpperCase() + outcome.slice(1);
  };

  const batters = Array.from(new Set(data.map((d) => d.BATTER))).sort();

  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <>
      <div className="visualization-container">
        <h2>Interactive Visualizations</h2>
        <p className="intro-text">
          Explore batted ball data with interactive visualizations. Filter by
          play outcome or by individual batter.
        </p>

        <div className="visualizations-grid">
          <div className="visualization-section">
            <h3>Filter by Play Outcome</h3>
            <div className="dropdown">
              <label htmlFor="outcomeSelect">
                <strong>Select Outcome:</strong>
              </label>
              <select
                id="outcomeSelect"
                value={selectedOutcome}
                onChange={(e) => setSelectedOutcome(e.target.value)}
              >
                {outcomes.map((outcome) => (
                  <option key={outcome} value={outcome}>
                    {formatOutcomeLabel(outcome)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-wrapper">
              <BaseballField
                data={data}
                selectedOutcome={selectedOutcome}
                svgId="field"
                tooltipId="tooltip"
              />
            </div>
          </div>

          <div className="visualization-section">
            <h3>Filter by Batter</h3>
            <div className="dropdown">
              <label htmlFor="batterSelect">
                <strong>Select Batter:</strong>
              </label>
              <select
                id="batterSelect"
                value={selectedBatter || "All"}
                onChange={(e) =>
                  setSelectedBatter(
                    e.target.value === "All" ? null : e.target.value,
                  )
                }
              >
                <option value="All">All</option>
                {batters.map((batter) => (
                  <option key={batter} value={batter}>
                    {batter}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-wrapper">
              <BaseballField
                data={data}
                selectedBatter={selectedBatter}
                svgId="batterField"
                tooltipId="tooltip"
              />
            </div>
          </div>
        </div>

        <div id="tooltip" className="tooltip"></div>
      </div>

      <hr className="section-divider" />

      <div className="description-section">
        <h3>Description:</h3>

        <p>
          This project is a visualization of batted ball data from baseball
          games. Users can change the dataset and interactively explore hit
          locations, launch angles, and exit velocities. The data is already
          given, but if using different data, make sure the format of the csv
          file is the same as the one provided in the{" "}
          <code>batted_ball_data.csv</code> file.
        </p>

        <h3>How to Use:</h3>

        <ul>
          <li>
            Use the dropdown menus to filter the data by play outcome or batter
          </li>
          <li>Hover over circles to see detailed information about each hit</li>
          <li>Click on a circle to view the video highlight of that play</li>
          <li>
            Colors represent different play outcomes (home runs = red, triples =
            gold, etc.)
          </li>
        </ul>
      </div>

      <h3>What to expect:</h3>

      <p>There are two visualizations that are similar:</p>

      <ol>
        <li>
          Can be filtered by the outcome of the play, such as single, double,
          triple, home run, error, fielders choice, sacrifice, out, and other.
        </li>
        <li>
          Can be filtered to see the plate appearances of each player in the
          dataset
        </li>
      </ol>

      <p>
        The circles in the visualizations are the distance the ball traveled and
        where it lands according to the data. The color in the circle means the
        outcome of the play.
      </p>

      <p>
        There is a tooltip that tells you who took the plate appearance,
        outcome, distance, LA, EV, and hang time. If you click on a circle, it
        will open the video of the play which it references.
      </p>

      <p>
        The source code can be found
        <a
          href="https://github.com/AcevedoJetter/batted-ball-data-viz"
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
