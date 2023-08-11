import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import { fetchRacers } from "./redux/services/fetchRacers";
import { useAppDispatch, useAppSelector } from "./types/hooks";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { MyListItemButton } from "./components/my_UI-material/MyListItemButton";
import { increaseCurrentPage } from "./redux/slices/racersSlice";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.racers.currentPage);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const racers = useAppSelector((state) => state.racers.racers);
  const bottomRef = useRef(null);
  console.log(currentPage);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      dispatch(increaseCurrentPage());
      dispatch(fetchRacers());
    });
    intersectionObserver.observe(bottomRef.current);
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <TransitionGroup className="racers-list" component="div">
        {racers.map((racer, index) => (
          <CSSTransition timeout={500} classNames="racer" key={racer.id}>
            <MyListItemButton
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
              index={index + 1}
              {...racer}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <CircularProgress
        color="secondary"
        ref={bottomRef}
        sx={{ "&&": { display: "block", justifyContent: "center" } }}
      />
    </>
  );
}

export default App;
