import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Dest, Students } from "./nodedGraph";

export default function ConnectionGraph({ connection }) {
  const { id, n1, n2, n3 } = connection;

  let data;
  if (n1 === n3) {
    data = {
      nodes: [
        { id: id, student: Students[id] },
        { id: n1, dest: Dest[n1 - 20] },
        { id: n2, dest: Dest[n2 - 20] },
      ],
      links: [
        { source: id, target: n1 },
        { source: n1, target: n2 },
      ],
    };
  } else {
    data = {
      nodes: [
        { id: id, student: Students[id] },
        { id: n1, dest: Dest[n1 - 20] },
        { id: n2, dest: Dest[n2 - 20] },
        { id: n3, dest: Dest[n3 - 20] },
      ],
      links: [
        { source: id, target: n1 },
        { source: n1, target: n2 },
        { source: n2, target: n3 },
      ],
    };
  }

  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel={(node) => node.student || node.dest}
      backgroundColor="black" 
      nodeColor={(node) => (node.student ? "#ffffff" : "#ffcc00")} 
      linkColor={() => "#ffffff"} 
      linkDirectionalArrowColor={() => "#ffffff"} 
      linkDirectionalParticleColor={() => "#ffffff"} 
      linkDirectionalParticleWidth={6}
      linkHoverPrecision={10}
    />
  );
}
