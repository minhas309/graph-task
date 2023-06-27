import { Button, Typography, Box } from "@mui/material";

const Homepage = () => {
    return (
        <div style={{ marginLeft: "20px" }}>
            <Typography variant="h1">HomePage</Typography>

            <Typography variant="h2">Information about cool home page</Typography>

            <Button variant="contained" sx={{ ml: 10 }}>Graph 1</Button>
            <Button >Graph 2</Button>

            <Box
            height={500}
            sx={{
                backgroundColor:"gray",
                flexGrow: 1, display: { xs: "flex", md: "none" },
                m:3,            
            }}
            ></Box>

<Box
            height={500}
            sx={{
                backgroundColor:"gray",
                flexGrow: 1, display: { lg: "flex", md: "none" },
                m:3,           
            }}
            ></Box>


        </div>
    );
}

export default Homepage;
