//Homepage component
import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import NodedGraph from "../components/nodedGraph";
import Timeline from "../components/timelineGraph";
import shadows from "@mui/material/styles/shadows";

const Homepage = () => {
  const [activeGraph, setActiveGraph] = useState("nodedGraph");

  const handleGraph1Click = () => {
    setActiveGraph("nodedGraph");
  };

  const handleGraph2Click = () => {
    setActiveGraph("timeline");
  };

  return (
    <div style={{
    }}>
      <Typography sx={{ typography: { md: 'h1', xs: 'h1' }, ml:2 }}>Home Page</Typography>

      <Typography sx={{ typography: { md: 'h2', xs: 'h2' }, ml:2, mb: 1}}>Information about cool home page</Typography>

      <Button
        variant="contained"
        sx={{ ml: 5 }}
        onClick={handleGraph1Click}
        disabled={activeGraph === "nodedGraph"}

      >
        Graph 1
      </Button>
      <Button
      variant="contained"
      sx={{ ml: 2 }}
        onClick={handleGraph2Click}
        disabled={activeGraph === "timeline"}
      >
        Graph 2
      </Button>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          m: 1,
        }}
      >
        {activeGraph === "nodedGraph" && <NodedGraph />}
        {activeGraph === "timeline" && <Timeline />}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none" ,  md: "flex" },
          m: 3,
          alignItems:"center",
          width: "80%"
        }}
      >
          {activeGraph === "nodedGraph" && <NodedGraph />}
          {activeGraph === "timeline" && <Timeline />}
      </Box>

    </div>
  );
};

export default Homepage;
