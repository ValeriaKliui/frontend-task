import { useEffect, useState } from "react";
import "./App.scss";
import { fetchRacers } from "./redux/services/fetchRacers";
import { useAppDispatch, useAppSelector } from "./types/hooks";
import { setCurrentPage } from "./redux/slices/racersSlice";

function App() {
  const dispatch = useAppDispatch();
  const racers = useAppSelector((state) => state.racers.racers);
  const [shouldBeUpdated, setShouldBeUpdated] = useState(false);
  const currentPage = useAppSelector((state) => state.racers.currentPage);
  useEffect(() => {
    dispatch(fetchRacers(1));
  }, []);

  const handleScroll = (event) => {
    if (
      Math.round(
        event.target.documentElement.scrollHeight -
          event.target.documentElement.clientHeight -
          event.target.documentElement.scrollTop
      ) < 20
    ) {
      dispatch(setCurrentPage(currentPage + 1));
      setShouldBeUpdated(true);
    } else setShouldBeUpdated(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    if (shouldBeUpdated) dispatch(fetchRacers(currentPage));
    return () => document.removeEventListener("scroll", handleScroll);
  }, [shouldBeUpdated]);

  return (
    <>
      {racers.map((racer) => (
        <div key={racer.id}>
          <p>
            {racer.id} {racer.first_name} {racer.last_name}
          </p>
        </div>
      ))}
    </>
  );
}

export default App;
