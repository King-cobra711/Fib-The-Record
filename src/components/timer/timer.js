import { useEffect, useState } from "react";

export default function Timer({
  refreshTimer,
  updateTime,
  setUpdateTime,
  seconds,
  setSeconds,
  refresh,
  setRefresh,
  timerOn,
  setTimerOn,
}) {
  //   functions

  //   keep track of the seconds.
  const handleTimer = () => {
    if (seconds <= 0) {
      // refresh triggers the useEffect in App.js. This will invoke the displayResults function.
      setRefresh(!refresh);
      //   sets seconds to the user input time. (the refresh time)
      setSeconds(refreshTimer);
    } else {
      setSeconds(seconds - 1);
    }
  };

  // useEffect
  useEffect(() => {
    let interval = null;
    // check if the user has submitted a new refresh time and then updates the timer. Not required for this assessment but I like it.
    if (updateTime) {
      setSeconds(refreshTimer);
      setUpdateTime(false);
    }
    // play/pause functionality.
    if (timerOn) {
      interval = setInterval(() => {
        handleTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    // must return this callback otherwise multiple setIntervals will be running at once.
    return () => clearInterval(interval);
  }, [seconds, timerOn, updateTime]);

  return (
    <div>
      Refresh in {seconds === null ? "(X)" : seconds} seconds
      <button
        className="btn btn-outline-secondary ms-3"
        onClick={() => setTimerOn(!timerOn)}
      >
        {timerOn ? (
          <i className="bi bi-pause-circle"> Stop</i>
        ) : (
          <i className="bi bi-play-circle"> Start</i>
        )}
      </button>
    </div>
  );
}
