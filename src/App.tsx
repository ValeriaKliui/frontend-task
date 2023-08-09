import React, { useEffect, useState } from "react";
import "./App.scss";
import { fetchRacers } from "./redux/services/fetchRacers";
import { useAppDispatch, useAppSelector } from "./types/hooks";
import { setCurrentPage } from "./redux/slices/racersSlice";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { MyListItemButton } from "./components/my_UI-material/MyListItemButton";

function App() {
  const dispatch = useAppDispatch();
  const [shouldBeUpdated, setShouldBeUpdated] = useState(false);
  const currentPage = useAppSelector((state) => state.racers.currentPage);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const racers = useAppSelector((state) => state.racers.racers);

  useEffect(() => {
    dispatch(fetchRacers(1));
  }, []);

  const handleScroll = () => {
    if (
      Math.round(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight -
          document.documentElement.scrollTop
      ) < 300
    ) {
      dispatch(setCurrentPage(currentPage + 1));
      setShouldBeUpdated(true);
    } else setShouldBeUpdated(false);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    if (shouldBeUpdated) dispatch(fetchRacers(currentPage));
    return () => document.removeEventListener("scroll", handleScroll);
  }, [shouldBeUpdated]);

  return (
    <TransitionGroup className="racers-list" component="ul">
      {racers.map((racer) => (
        <CSSTransition timeout={500} classNames="racer" key={racer.id}>
          <MyListItemButton
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            {...racer}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default App;
