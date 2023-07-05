//nodedGraph component
import React, { useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { Info } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import ConnectionGraph from "./singleGraph";

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

export const Dest = [
  "Norway",
  "Spain",
  "France",
  "Finland",
];

export default function NodedGraph() {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);

  function genRandomTree(N = 24) {
    const nodes = [...Array(N).keys()].map((i) => {
      if (i < 20) {
        return { id: i, student: Students[i], type: "student" };
      } else {
        return { id: i, dest: Dest[i - 20], type: "dest" };
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


  const handleBack = () => {
    setSelectedConnection(null)
  }

  const data = genRandomTree(24);
  const distance = 1900;

  const handleNodeClick = (node) => {
    setSelectedNode(node);

    const connections = Connections.find((connection) => connection.id === node.id);

    if (connections) {
      setSelectedConnection(connections);
    }
  };

  const CameraOrbit = () => {
    return (
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel={(node) => node.student || node.dest}
        nodeColor={(node) => node.type === "student" ? "#61dafb" : "#ff9800"} // Change colors here
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        backgroundColor="#222222" // Change background color here
        onNodeClick={handleNodeClick}
        onLinkClick={(link) => fgRef.current.emitParticle(link)}
      />
    );
  };

  return (
    <div
    style={{
      width: "100%",
        padding: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",
        marginBottom: "50px",
        maxWidth: "90vw",
    }}
    >
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        m: 1,
      }}
    >
      {/* Desktop tooltip */}
      <div style={{ marginTop: "10px" }}>
        <Tooltip title="Notable Info" placement="top">
          <div
            style={{
              backgroundColor: "rgba(25, 118, 210, 0.8)",
              borderRadius: "5px",
              color: "#fff",
              padding: "5px 10px",
              display: "flex",
              width: "max-content",
              marginBottom: "20px"
            }}
          >
            <Info style={{ marginRight: "5px" }} /> Zoom in a little and hover over some nodes, Click on them too!!!
          </div>
        </Tooltip>
      </div>
    </Box>

    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        m: 1,
      }}
    >
      {/* Mobile tooltip */}
      <div style={{ marginTop: "10px" }}>
        <Tooltip title="Notable Info" placement="top">
          <div
            style={{
              backgroundColor: "rgba(25, 118, 210, 0.8)",
              borderRadius: "5px",
              color: "#fff",
              padding: "1px 2px",
              display: "flex",
              width: "max-content",
              marginBottom: "20px"
            }}
          >
            <Info style={{ marginRight: "1px" }} /> Zoom in a little and hover over some nodes, Click on them too!!!
          </div>
        </Tooltip>
      </div>
    </Box>

    {selectedConnection ? (
      <ConnectionGraph connection={selectedConnection} onBack={handleBack} />
    ) : (
      <CameraOrbit />
    )}
  </div>
  );
}
