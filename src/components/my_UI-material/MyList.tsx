import React from "react";
import List from "@mui/material/List";
import { useAppSelector } from "../../types/hooks";
import { MyListItemButton } from "./MyListItemButton";
import { CSSTransition } from "react-transition-group";

interface MyListProps {
  selectedIndex: number;
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
}

export const MyList: React.FC<MyListProps> = ({
  selectedIndex,
  handleListItemClick,
}) => {
  const racers = useAppSelector((state) => state.racers.racers);

  /* <TransitionGroup classNameName="racers-list" component={AlignItemsList()}>
          {racers.map((racer) => (
            <CSSTransition timeout={500} classNameNames="racer">
              <li key={racer.id}>
                <p>
                  {racer.id} {racer.first_name} {racer.last_name}
                </p>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup> */

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {racers.map(
        (racer) => (
          <CSSTransition timeout={500} classNames="racer">
            <MyListItemButton
              key={racer.id}
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
              {...racer}
            />
          </CSSTransition>
        )

        // return (
        //   <MyListItemButton
        //     key={racer.id}
        //     selectedIndex={selectedIndex}
        //     handleListItemClick={handleListItemClick}
        //     {...racer}
        //   />
        // );
      )}
    </List>
  );
};
