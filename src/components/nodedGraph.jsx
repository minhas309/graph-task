import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

export default function App() {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [data, setData] = useState();
  // const data = genRandomTree(24);
  const distance = 1900;
  useEffect(() => {
    setData(genRandomTree(24));
  }, []);
  function random(val) {
    return Math.floor(Math.random() * val);
  }

  const [connections, setConnections] = useState([]);
  setConnections((prevConnections) => [...prevConnections, newConnection]);
  function genRandomTree(N = 24) {
    const students = [
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
      "Tara",
    ];

    const semester = [
      { name: "Sem1", node: "Norway", link: 20 },
      { name: "Sem2", node: ["Spain", "France"], link: [21, 22] },
      { name: "Sem3", node: ["Finland", "Norway"], link: [23, 20] },
    ];

    const nodes = [...Array(N).keys()].map((i) => ({
      id: i,
      student: students[i],
    }));
    const links = [];
    connections.splice(0, connections.length);
    for (let i = 0; i < 20; i++) {
      links.push({ source: i, target: semester[0].link });

      let num = random(semester[1].link.length);
      links.push({ source: semester[0].link, target: semester[1].link[num] });

      let num2 = random(semester[2].link.length);
      links.push({
        source: semester[1].link[num],
        target: semester[2].link[num2],
      });

      const newConnection = {
        id: i,
        n1: semester[0].link,
        n2: semester[1].link[num],
        n3: semester[2].link[num2],
      };
    }

    console.log(connections);

    return { nodes, links };
  }

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const CameraOrbit = () => {
    return (
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel={(node) => `${node.student}`} // Display student names
        linkDirectionalParticleColor={() => "red"}
        linkDirectionalParticleWidth={6}
        linkHoverPrecision={10}
        onNodeClick={handleNodeClick} // Update event handler for node click
        onLinkClick={(link) => fgRef.current.emitParticle(link)}
      />
    );
  };

  return (
    <div className="App">
      {selectedNode && (
        <div>
          <h2>Selected Node: {selectedNode.student}</h2>
          <h3>Links:</h3>
          <ul>
            {connections.map((connection) => {
              if (connection.id == selectedNode.id) {
                return (
                  <li key={connection.id}>
                    Link {connection.id}: {connection.n1}, {connection.n2},{" "}
                    {connection.n3}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
      <CameraOrbit />
    </div>
  );
}
