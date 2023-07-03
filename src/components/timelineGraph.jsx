import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Connections, Semester, Students } from "./nodedGraph";
import { Menu, MenuItem, Button, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";

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

  const VALUES = ["01", "02", "03"];

  const description = [
    "First Semester: " + dest1,
    "Second Semester: " + dest2,
    "Third Semester: " + dest3,
  ];

  const handleFirstStudentClick = () => {
    const firstStudentConnection = Connections[Connections.length - 20];
    setBtnName(Students[firstStudentConnection.id]);
    setDest1(Semester[0].node);
    setDest2(Semester[1].node[firstStudentConnection.n2 === 21 ? 0 : 1]);
    setDest3(Semester[2].node[firstStudentConnection.n3 === 23 ? 0 : 1]);
    handleClose();
  };

  return (
    <div
      style={{
        width: "40%",
        padding: "10px",
        marginLeft: "150px",
        marginBottom: "50px",
        marginTop: "30px",
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
        <div style={{ marginTop: "10px" }}>
          <Tooltip title="Notable Info" placement="top">
            <div
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.8)",
                borderRadius: "5px",
                color: "#fff",
                padding: "5px 10px",
                display: "flex",
                width:"max-content",
                marginBottom:"20px"
              }}
            >
            <Info style={{ marginRight: "5px" }} /> Select Student From Dropdown menu to see the destination
            </div>
          </Tooltip>
        </div>

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
                  setDest2(Semester[1].node[connection.n2 === 21 ? 0 : 1]);
                  setDest3(Semester[2].node[connection.n3 === 23 ? 0 : 1]);
                }}
              >
                {Students[connection.id]}
              </Button>
              {console.log("Helloi" + Connections.length)}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div style={{ width: "100%", height: "100px", margin: "0 auto" }}>
        <HorizontalTimeline
          styles={{ outline: "#DFA867", foreground: "#19295C" }}
          index={value}
          indexClick={(index) => {
            setValue(index);
          }}
          values={VALUES}
          getLabel={(value, index) => {
            const semesterNames = [
              "1st Sem",
              "2nd Sem",
              "3rd Sem",
            ];
            return semesterNames[index];
          }}
          isTouchEnabled={false}
          isKeyboardEnabled={false}
          showButtons={false}
        />
      </div>
      <div style={{ textAlign: "center" }}>{description[value]}</div>
    </div>
  );
}
