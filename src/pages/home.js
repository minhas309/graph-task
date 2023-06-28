import { Button, Typography, Box } from "@mui/material";
import NodedGraph from "../components/nodedGraph";
import Timeline from "../components/timelineGraph";

const Homepage = () => {
    return (
        <div >
            <Typography variant="h1">HomePage</Typography>

            <Typography variant="h2">Information about cool home page</Typography>

            <Button variant="contained" sx={{ ml: 10 }}>Graph 1</Button>
            <Button >Graph 2</Button>

            <Box
            sx={{
                flexGrow: 1, display: { xs: "flex", md: "none" },
                m:3            
            }}
             >
            <NodedGraph />
            <Timeline/>
             </Box>

            <Box
            sx={{
                flexGrow: 1, display: { md: "flex", xs: "none" },
                m:3,           
            }}
            >
            <NodedGraph />

            </Box>
            <Timeline/>

        </div>
    );
}

export default Homepage;
