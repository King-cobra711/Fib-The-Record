import { useEffect, useState } from "react";

export default function Timer({ startTime, update, setUpdate }) {
  // state
  const [seconds, setSeconds] = useState(startTime);
  const [start, setStart] = useState(true);

  //   functions

  const handleTimer = () => {
    if (seconds <= 0) {
      setSeconds(startTime);
    } else {
      setSeconds(seconds - 1);
    }
  };

  // useEffect
  useEffect(() => {
    //   https://stackoverflow.com/questions/56617186/what-happens-when-setinterval-is-called-within-a-useeffect
    let interval = null;
    if (update) {
      setSeconds(startTime);
      setUpdate(false);
    }
    if (start) {
      interval = setInterval(() => {
        handleTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds, start, update]);

  return (
    <div>
      Refresh in {seconds} seconds
      <button className="btn btn-secondary" onClick={() => setStart(!start)}>
        {start ? "STOP" : "START"}
      </button>
    </div>
  );
}
