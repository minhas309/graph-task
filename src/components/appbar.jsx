import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from '@mui/icons-material/GitHub';



function ResponsiveAppBar() {

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white"
      }}
    >
        
      <Container maxWidth="xl">
        
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none"
            }}
          >
            V A L I D
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Repository">
              <IconButton
              href="https://github.com/minhas309/graph-task"
              sx={{ p: 0 }}>
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'Black',
              textDecoration: 'none',
            }}
            >
            SOME COOL SITE NAME
          </Typography>
            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
