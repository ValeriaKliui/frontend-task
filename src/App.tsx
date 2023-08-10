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
  const racerRef = useRef(null);
  const [showRacer, setShowRacer] = useState(true);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      dispatch(increaseCurrentPage());
      dispatch(fetchRacers(currentPage));
    });
    intersectionObserver.observe(bottomRef.current);
  }, []);

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setShowRacer(true);
      }
    });
  };

  const options = {
    threshold: 1.0,
    root: null,
    rootMargin: "0px",
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (racerRef.current) observer.observe(racerRef.current);
    return () => {
      if (racerRef.current) observer.unobserve(racerRef.current);
    };
  }, [racerRef, options]);

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
              showRacer={showRacer}
              ref={racerRef}
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
