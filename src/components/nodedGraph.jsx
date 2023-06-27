import React, { useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";

function random(val) {
  return Math.floor(Math.random() * val);
}
const connections = [];
function genRandomTree(N = 24, fixedNodeId = 0) {
  // const students = [
  //   "Ahmed",
  //   "Ali",
  //   "Arslan",
  //   "Abdullah",
  //   "Qasim",
  //   "Hamza",
  //   "Hammad"
  // ];
  const semester = [
    { name: "Sem1", node: "Norway", link: 0 },
    { name: "Sem2", node: ["Spain", "France"], link: [1, 2] },
    { name: "Sem3", node: ["Finland", "Norway"], link: [3, 0] }
  ];

  const nodes = [...Array(N).keys()].map((i) => ({ id: i }));
  const links = [];

  for (let i = 4; i < N; i++) {
    links.push({ source: i, target: semester[0].link });

    let num = random(semester[1].link.length);
    links.push({ source: semester[0].link, target: semester[1].link[num] });

    let num2 = random(semester[2].link.length);
    links.push({
      source: semester[1].link[num],
      target: semester[2].link[num2]
    });

    connections.push({
      id: i,
      n1: semester[0].link,
      n2: semester[1].link[num],
      n3: semester[2].link[num2]
    });
  }
  console.log(connections);
  return { nodes, links };
}

export default function NodedGraph() {
  const fgRef = useRef();

  const data = genRandomTree(24, 0);
  const distance = 1900;

  const CameraOrbit = () => {
    return (
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel={(node) => `${node.index}`} // Display node names
        // linkLabel={(link) => `Link ${link.index}`} // Generate link labels
        linkDirectionalParticleColor={() => "red"}
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        onLinkClick={(link) => fgRef.current.emitParticle(link)}
      />
    );
  };

  return (
    <>
      <CameraOrbit />
    </>
  );
}
