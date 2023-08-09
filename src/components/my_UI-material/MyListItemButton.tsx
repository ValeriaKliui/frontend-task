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
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
}

export const MyListItemButton: React.FC<MyListItemButtonProps> = ({
  id,
  color,
  first_name,
  last_name,
  speed,
  time,
  selectedIndex,
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
        },
        "&&:hover": {
          backgroundColor: rgbOpacityColor(color, 0.5),
          boxShadow: "4px 4px 2px 1px rgba(0, 0, 255, .2)",
        },
        "&&.racer-enter": {
          opacity: 0,
        },
        "&&.racer-enter-active": {
          opacity: 1,
          transition: "opacity 500ms ease-in",
        },
      }}
      selected={selectedIndex === id}
      onClick={(event) => handleListItemClick(event, id)}
    >
      <ListItemIcon
        sx={{ minWidth: "2em", color: "black", fontWeight: "bold" }}
      >
        {id}
      </ListItemIcon>
      <ListItemAvatar>
        <MyAvatar alt="avatar" color={color} />
      </ListItemAvatar>
      <ListItemText
        primary={`${first_name} ${last_name}`}
        secondary={
          <span style={{ display: "flex", gap: "10px" }}>
            <Typography component="span" variant="body2" color="#5799e4">
              {time}
            </Typography>
            <Typography component="span" variant="body2" color="#9d97eb">
              {speed}
            </Typography>
          </span>
        }
      />
    </ListItemButton>
  );
};
