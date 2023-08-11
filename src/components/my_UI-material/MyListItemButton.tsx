import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MyAvatar } from "./MyAvatar";
import { Racer } from "../../types";
import hexRgb from "hex-rgb";
import React from "react";
import Typography from "@mui/material/Typography";

interface MyListItemButtonProps extends Racer {
  selectedIndex: number;
  index: number;
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
}

export const MyListItemButton: React.FC<MyListItemButtonProps> = ({
  color,
  first_name,
  last_name,
  speed,
  time,
  selectedIndex,
  index,
  handleListItemClick,
}) => {
  const rgbOpacityColor = (color: string, alpha: number) => {
    return hexRgb(color, { format: "css", alpha });
  };
  return (
    <ListItemButton
      alignItems="center"
      className="racer"
      sx={{
        "&&": {
          borderRadius: "15px",
          marginBottom: "10px",
          boxShadow: "4px 4px 2px 1px rgba(0, 0, 255, .2)",
        },
        "&&.Mui-selected": {
          backgroundColor: rgbOpacityColor(color, 0.7),
          boxShadow: `4px 4px 2px 1px rgba(0, 0, 255, .2)`,
          "&& *": {
            color: "white",
          },
        },
        "&&:hover": {
          backgroundColor: rgbOpacityColor(color, 0.5),
          boxShadow: "4px 4px 2px 1px rgba(0, 0, 255, .2)",
          "&& *": {
            color: "white",
          },
        },
        "&&.racer-enter": {
          opacity: 0,
        },
        "&&.racer-enter-active": {
          opacity: 1,
          transition: "opacity 500ms ease-in",
        },
      }}
      selected={selectedIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
    >
      <ListItemIcon
        sx={{ minWidth: "2em", color: "black", fontWeight: "bold" }}
      >
        {index}
      </ListItemIcon>
      <ListItemAvatar>
        <MyAvatar alt="avatar" color={color} />
      </ListItemAvatar>
      <ListItemText
        primary={`${first_name} ${last_name}`}
        secondary={
          <span style={{ display: "flex", gap: "10px" }}>
            <Typography component="span" variant="body2" color="#5799e4">
              {time.slice(0, time.length - 4)}
            </Typography>
            <Typography component="span" variant="body2" color="#9d97eb">
              {speed} m/h
            </Typography>
          </span>
        }
      />
    </ListItemButton>
  );
};
