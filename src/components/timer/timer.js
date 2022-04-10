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
  // state

  //   functions

  const handleTimer = () => {
    if (seconds <= 0) {
      setRefresh(!refresh);
      setSeconds(refreshTimer);
    } else {
      setSeconds(seconds - 1);
    }
  };

  // useEffect
  useEffect(() => {
    //   https://stackoverflow.com/questions/56617186/what-happens-when-setinterval-is-called-within-a-useeffect
    let interval = null;
    if (updateTime) {
      setSeconds(refreshTimer);
      setUpdateTime(false);
    }
    if (timerOn) {
      interval = setInterval(() => {
        handleTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }

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
