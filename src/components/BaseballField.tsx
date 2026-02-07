import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { ProcessedBattedBallData } from "../types/battedBallData.js";
import "./BaseballField.css";

interface BaseballFieldProps {
  data: ProcessedBattedBallData[];
  selectedOutcome?: string;
  selectedBatter?: string | null;
  svgId: string;
  tooltipId: string;
}

const WIDTH = 700;
const HEIGHT = 600;
const MARGIN = { top: 20, right: 20, bottom: 20, left: 20 };
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
const CENTER_X = INNER_WIDTH / 2;
const CENTER_Y = INNER_HEIGHT * 0.9;

const distanceScale = d3.scaleLinear().domain([0, 500]).range([0, 500]);

const COLOR_SCALE: Record<string, string> = {
  homerun: "red",
  triple: "gold",
  double: "blue",
  single: "green",
  out: "gray",
  error: "pink",
  sacrifice: "lightblue",
  fielderschoice: "purple",
  undefined: "orange",
};

function drawField(svg: d3.Selection<SVGGElement, unknown, null, undefined>) {
  svg
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 300)
    .attr("y2", -300)
    .attr("stroke", "green")
    .attr("stroke-width", 2);

  svg
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", -300)
    .attr("y2", -300)
    .attr("stroke", "green")
    .attr("stroke-width", 2);

  svg
    .append("path")
    .attr(
      "d",
      d3
        .arc<unknown>()
        .innerRadius(0)
        .outerRadius(425)
        .startAngle(-Math.PI / 4)
        .endAngle(Math.PI / 4)
    )
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("fill", "lightgreen");

  svg.append("circle").attr("r", distanceScale(500)).attr("fill", "none");
}

function formatPlayOutcome(outcome: string): string {
  if (outcome === "undefined") return "other";
  if (outcome === "homerun") return "home run";
  if (outcome === "fielderschoice") return "fielders choice";
  return outcome;
}

export default function BaseballField({
  data,
  selectedOutcome,
  selectedBatter,
  svgId,
  tooltipId,
}: BaseballFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("height", "auto")
      .style("display", "block")
      .style("margin", "0 auto");

    const g = svg
      .append("g")
      .attr("transform", `translate(${CENTER_X}, ${CENTER_Y})`);

    gRef.current = g.node();

    // Draw the field
    drawField(g);

    // Filter data based on props
    let filteredData = data;
    if (selectedOutcome && selectedOutcome !== "all") {
      filteredData = filteredData.filter(
        (d) => d.PLAY_OUTCOME === selectedOutcome
      );
    }
    if (selectedBatter) {
      filteredData = filteredData.filter((d) => d.BATTER === selectedBatter);
    }

    const tooltip = d3.select(`#${tooltipId}`);

    const circles = g
      .selectAll<SVGCircleElement, ProcessedBattedBallData>("circle.hit")
      .data(
        filteredData,
        (d) =>
          `${d.GAME_DATE}-${d.HIT_DISTANCE}-${d.BATTER}-${
            selectedOutcome || ""
          }-${selectedBatter || ""}`
      );

    circles.join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "hit")
          .attr("r", 5)
          .attr("stroke", "black")
          .attr("fill", (d) => COLOR_SCALE[d.PLAY_OUTCOME] || "brown")
          .attr(
            "cx",
            (d) =>
              distanceScale(d.HIT_DISTANCE) *
              Math.sin((d.EXIT_DIRECTION * Math.PI) / 180)
          )
          .attr(
            "cy",
            (d) =>
              -distanceScale(d.HIT_DISTANCE) *
              Math.cos((d.EXIT_DIRECTION * Math.PI) / 180)
          )
          .on("mouseover", (_event, d) => {
            const playOutcome = formatPlayOutcome(d.PLAY_OUTCOME);
            tooltip.transition().duration(100).style("opacity", 1);
            tooltip.html(`
              <strong>${d.BATTER}</strong><br/>
              Outcome: ${playOutcome}<br/>
              Distance: ${d.HIT_DISTANCE} ft<br/>
              Launch Angle: ${d.LAUNCH_ANGLE}°<br/>
              Exit Speed: ${d.EXIT_SPEED} mph<br/>
              Hang Time: ${d.HANG_TIME}s<br/>
              <i>Click this circle to view the video highlight</i>
            `);
          })
          .on("click", (_event, d) => {
            window.open(d.VIDEO_LINK, "_blank");
          })
          .on("mousemove", (event: MouseEvent) => {
            tooltip
              .style("left", `${event.pageX + 12}px`)
              .style("top", `${event.pageY - 28}px`);
          })
          .on("mouseout", () =>
            tooltip.transition().duration(200).style("opacity", 0)
          ),
      (update) =>
        update
          .transition()
          .duration(300)
          .attr(
            "cx",
            (d) =>
              distanceScale(d.HIT_DISTANCE) *
              Math.sin((d.EXIT_DIRECTION * Math.PI) / 180)
          )
          .attr(
            "cy",
            (d) =>
              -distanceScale(d.HIT_DISTANCE) *
              Math.cos((d.EXIT_DIRECTION * Math.PI) / 180)
          )
          .attr("fill", (d) => COLOR_SCALE[d.PLAY_OUTCOME] || "brown"),
      (exit) => exit.transition().duration(300).attr("r", 0).remove()
    );
  }, [data, selectedOutcome, selectedBatter, tooltipId]);

  return <svg ref={svgRef} id={svgId} />;
}
