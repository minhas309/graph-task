import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Connections } from "./nodedGraph";
import { Menu, MenuItem, Button, Tooltip, Box } from "@mui/material";
import { Info } from "@mui/icons-material";
import Students from '../utils/Students'
import Semester from '../utils/Semester'

export default function Timeline() {
  const [value, setValue] = useState(0);
  const [btnName, setBtnName] = useState("Students");
  const [dest1, setDest1] = useState("");
  const [dest2, setDest2] = useState("");
  const [dest3, setDest3] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Updated VALUES array to have three values at constant distance
  const VALUES = [0, 1, 2];

  const getLabel = (value, index) => {
    const semesterNames = ["1st Sem", "2nd Sem", "3rd Sem"];
    return semesterNames[value];
  };

  const description = [
    "First Semester: " + dest1,
    "Second Semester: " + dest2,
    "Third Semester: " + dest3,
  ];

  return (
    <div
      style={{
        width: "90%",
        padding: "10px",
        marginLeft: "20px",
        marginRight: "auto",
        marginBottom: "50px",
      }}
    >
      <div>
        <Tooltip title="Select first student" placement="top">
          <Button
            variant="contained"
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {btnName}
          </Button>
        </Tooltip>
       <div
  style={{
    marginTop: "10px",
    display: "flex",
  }}
>
  <Tooltip title="Notable Info" placement="top">
    <div
      style={{
        backgroundColor: "rgba(25, 118, 210, 0.8)",
        borderRadius: "5px",
        color: "#fff",
        padding: "5px 10px",
        display: "flex",
        maxWidth: "90%",
      }}
    >
      <Info style={{ marginRight: "5px" }} />
      <span style={{ flex: 1 }}>
        Select Student From Dropdown menu to see the destination
      </span>
    </div>
  </Tooltip>
</div>

        {/* Dropdown menu renders here */}

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {Connections.slice(Connections.length - 20).map((connection) => (
            <MenuItem key={connection.id}>
              <Button
                textAlign="center"
                variant="contained"
                onClick={(e) => {
                  setBtnName(Students[connection.id]);
                  handleClose();
                  setDest1(Semester[0].node);
                  setDest2(
                    Semester[1].node[connection.n2 === 21 ? 0 : 1]
                  );
                  setDest3(
                    Semester[2].node[connection.n3 === 23 ? 0 : 1]
                  );
                }}
              >
                {Students[connection.id]}
              </Button>
              {console.log("Helloi" + Connections.length)}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* Timeline Graph rendering */}

      <Box sx={{ display: { xs: "flex", md: "none" }, width: "90%", height: "100px", marginLeft: "15px" }}>
        <HorizontalTimeline
          styles={{ outline: "#DFA867", foreground: "#19295C" }}
          index={value}
          indexClick={(index) => {
            setValue(index);
          }}
          values={VALUES}
          getLabel={getLabel}
          isTouchEnabled={true}
          isKeyboardEnabled={true}
          showButtons={true}
        />
      </Box>

      <Box sx={{ display: {xs: "none" , md: "flex" }, width: "70%", height: "100px", marginLeft: "15px" }}>
        <HorizontalTimeline
          styles={{ outline: "#DFA867", foreground: "#19295C" }}
          index={value}
          indexClick={(index) => {
            setValue(index);
          }}
          values={VALUES}
          getLabel={getLabel}
          isTouchEnabled={true}
          isKeyboardEnabled={true}
          showButtons={true}
        />
      </Box>

      <div style={{ textAlign: "center" }}>{description[value]}</div>
    </div>
  );
}
