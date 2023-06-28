import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Connections, Semester, Students } from "./nodedGraph";
import { Menu, MenuItem, Button } from "@mui/material";
import { Padding } from "@mui/icons-material";


export default function Timeline() {
    const [value, setValue] = useState(0);
    const [previous, setPrevious] = useState(0);
    const [btnName, setBtnName] = useState("Students")
    const [dest1, setDest1] = useState("");
    const [dest2, setDest2] = useState("");
    const [dest3, setDest3] = useState("");


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // Values should be only date
    const VALUES = ["2021-03-15", "2021-05-26", "2021-08-08"];

    // Description array corresponding to values
    const description = [
        "First Semester: " + dest1,
        "Second Semester: " + dest2,
        "Third Semester: " + dest3,
    ];

    return (


        <div
            style={{
                width: "60%",
                Padding: '10px',
                margin:"150px"
            }}
        >

            <div>
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {btnName}
                </Button>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >      {Connections.slice(Connections.length - 20).map((connection) => (
                    <MenuItem key={connection.id} >
                        <Button textAlign="center" variant="contained"
                        onClick={(e) => {setBtnName(Students[connection.id],
                             handleClose,
                             setDest1(Semester[0].node),
                             setDest2(Semester[1].node[connection.n2===21? 0:1]),
                             setDest3(Semester[2].node[connection.n3===23? 0:1]),
                             )}}
                        >{Students[connection.id]} </Button>
                        {console.log("Helloi" + Connections.length)}
                    </MenuItem>
                ))}

                </Menu>
            </div>

            <div style={{
                width: "100%",
                height: "100px",
                margin: "0 auto"
            }}>
                <HorizontalTimeline
                    styles={{ outline: "#DFA867", foreground: "#19295C" }}
                    index={value}
                    indexClick={(index) => {
                        setValue(index);
                        setPrevious(value);
                    }}
                    values={VALUES}
                    
                />
            </div>
            <div style={{
                textAlign: 'center',
            }}>{description[value]}</div>

        </div>
    );
}
