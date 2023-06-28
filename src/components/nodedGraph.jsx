import React, { useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { Info } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

function random(val) {
  return Math.floor(Math.random() * val);
}


export const Connections = [];
export const Semester = [
  { name: "Sem1", node: "Norway", link: 20 },
  { name: "Sem2", node: ["Spain", "France"], link: [21, 22] },
  { name: "Sem3", node: ["Finland", "Norway"], link: [23, 20] }
];
export const Students = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Penny",
  "Quentin",
  "Ruby",
  "Samuel",
  "Tara"
];


function genRandomTree(N = 24) {

  
  const dest = [
    "Norway",
    "Spain",
    "France",
    "Finland",
  ]

  const nodes = [...Array(N).keys()].map((i) => {
    if (i < 20) {
      return { id: i, student: Students[i] };
    } else {
      return { id: i, dest: dest[i - 20] };
    }
  });
  const links = [];

  for (let i = 0; i < 20; i++) {
    links.push({ source: i, target: Semester[0].link });

    let num = random(Semester[1].link.length);
    links.push({ source: Semester[0].link, target: Semester[1].link[num] });

    let num2 = random(Semester[2].link.length);
    links.push({
      source: Semester[1].link[num],
      target: Semester[2].link[num2]
    });

    Connections.push({
      id: i,
      n1: Semester[0].link,
      n2: Semester[1].link[num],
      n3: Semester[2].link[num2]
    });
  }

  return { nodes, links };
}

export default function NodedGraph() {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  const data = genRandomTree(24);
  const distance = 1900;

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    alert("Told you not to click over it in caps!!!!!!! The feature is not fully implimented just yet. Mean while you can checkout the other graph :) Sorry for inconvinience")
  };

  const CameraOrbit = () => {
    return (
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel={(node) => node.student || node.dest}
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        onNodeClick={handleNodeClick} // Update event handler for node click
        onLinkClick={(link) => fgRef.current.emitParticle(link)}
      />
    );
  };

  return (
    <div>
       <div style={{ marginTop: "10px" }}>
          <Tooltip title="Notable Info" placement="top">
            <div
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.8)",
                borderRadius: "5px",
                color: "#fff",
                padding: "5px 10px",
                display: "flex",
                width:"max-content",
                marginBottom:"20px"
              }}
            >
            <Info style={{ marginRight: "5px" }} /> Zoon-in a little and hover over some Node but DO NOT CLICK OVER IT!!! 
            </div>
          </Tooltip>
        </div>

      <CameraOrbit />
    </div>
  );
}
