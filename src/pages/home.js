import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import NodedGraph from "../components/nodedGraph";
import Timeline from "../components/timelineGraph";

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
        margin:"20px"
    }}>
      <Typography variant="h1">HomePage</Typography>

      <Typography variant="h2">Information about cool home page</Typography>

      <Button
        variant="contained"
        sx={{ ml: 10 }}
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
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          m: 3,
        }}
      >
        {activeGraph === "nodedGraph" && <NodedGraph />}
        {activeGraph === "timeline" && <Timeline />}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { md: "flex", xs: "none" },
          m: 3,
        }}
      >
        {activeGraph === "nodedGraph" && <NodedGraph />}
      </Box>

      {activeGraph === "timeline" && <Timeline />}
    </div>
  );
};

export default Homepage;
