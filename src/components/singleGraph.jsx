//ConnectionGraph component
import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-3d";
import Dest from '../utils/Dest'
import Students from '../utils/Students'
import { Button } from "@mui/material";
export default function ConnectionGraph({ connection, onBack }) {
  const { id, n1, n2, n3 } = connection;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function genGraph() {
    const nodes = [
      { id: id, student: Students[id] },
      { id: n1, dest: Dest[n1 - 20] },
      { id: n2, dest: Dest[n2 - 20] },
    ];

    const links = [];
    links.push({ source: id, target: n1 });
    links.push({ source: n1, target: n2 });


    if( n1 === n3 ) {
      nodes.push(...nodes, { id: n3 + 5, dest: Dest[n3 - 20] });
      links.push({ source: n2, target: n3 + 5 });
    }
    else {
      nodes.push(...nodes, { id: n3, dest: Dest[n3 - 20] });
      links.push({ source: n2, target: n3 });
    }

    return { nodes, links };
  }

  const data = genGraph();
  const distance = windowWidth < 600 ? 500 : 1000;

  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "999",
          backgroundColor: "grey",
          color: "white",
          cursor: "pointer",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
        }}
        onClick={(e)=>{onBack()}}
      >
        Back
      </Button>
      <ForceGraph2D
        graphData={data}
        nodeLabel={(node) => node.student || node.dest}
        backgroundColor="black"
        nodeColor={(node) => (node.student ? "#61dafb" : "#ff9800")}
        linkColor={() => "#ffffff"}
        linkDirectionalArrowColor={() => "#ffffff"}
        linkDirectionalParticleColor={() => "#ffffff"}
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        width={windowWidth / 1.1}
        height={750}
        cameraDistance = {distance}
      />
    </div>
  );
}
