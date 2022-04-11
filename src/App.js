import { useEffect, useState } from "react";
import {
  showSuccessMessage,
  showErrorMessage,
  showFIBMessage,
} from "./components/alerts/alerts";
import FadeIn from "react-fade-in";

// Components
import Timer from "./components/timer/timer";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let fibRange = 1000;

  // STATE

  // timer state

  const [timerOn, setTimerOn] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [seconds, setSeconds] = useState(refreshTimer);
  const [updateTime, setUpdateTime] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  // state for functions
  const [userArray, setUserArray] = useState([]);
  const [countUnique, setcountUnique] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [alerts, setAlerts] = useState({
    error: "",
    success: "",
    FIB: "",
  });
  const { error, success, FIB } = alerts;
  //

  // functions

  // https://www.mygreatlearning.com/blog/why-is-time-complexity-essential/#:~:text=Time%20complexity%20is%20the%20amount,of%20code%20in%20an%20algorithm.

  // https://learnersbucket.com/examples/algorithms/program-to-find-the-nth-fibonacci-number/

  //To store the function values
  let memo = [0, 1];

  //Function to calculate the fibonacci
  const fibonacci = (num) => {
    //Get the value for current number
    let result = memo[num];
    //If there is no value for current number
    if (typeof result !== "number") {
      //call the function recursively and store the result
      result = fibonacci(num - 1) + fibonacci(num - 2);
      memo[num] = result;
    }
    //Else if value then return it
    return result;
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

  // The default radix for parseInt is 10 so any number will be rounded
  const perfectSquare = (n) => {
    let s = parseInt(Math.sqrt(n));
    return s * s === n;
  };

  const fibCheck = (n) => {
    if (n && n <= fibonacci(fibRange)) {
      return perfectSquare(5 * n * n + 4) || perfectSquare(5 * n * n - 4);
    }
  };

  // const handleChangeInput = (e) => {
  //   setUserNum(Number(e.target.value));
  // };

  // https://stackoverflow.com/questions/62900377/why-is-react-setstate-hook-not-updating-immediately
  const handleChangeArray = (e) => {
    e.preventDefault();
    let userNum = document.getElementById("userNum").value;
    userNum = userNum.replace(/\b0+/g, "");
    if (userNum !== "") {
      setUserArray([...userArray, userNum]);
      if (fibCheck(Number(userNum))) {
        setAlerts({
          error: "",
          success: "",
          FIB: "FIB",
        });
        setTimeout(() => {
          setAlerts({
            error: "",
            success: "",
            FIB: "",
          });
        }, 500);
      } else {
        setAlerts({
          error: "",
          success: "",
          FIB: "",
        });
      }
    } else {
      setAlerts({
        error: "No number added",
        success: "",
        FIB: "",
      });
    }
    document.getElementById("userNum").value = "";
  };

  const handleTime = (e) => {
    e.preventDefault();
    let time = document.getElementById("time").value;
    const validate = /^\d+$/;
    time = time.replace(/\b0+/g, "");
    if (validate.test(time)) {
      setRefreshTimer(time);
      setUpdateTime(!updateTime);
      setGameStart(true);
      setTimerOn(true);
      setAlerts({
        success: "",
        error: "",
        FIB: "",
      });
    } else {
      setAlerts({
        ...alerts,
        error: "must enter a positive whole number",
      });
      document.getElementById("time").value = "";
    }
    document.getElementById("time").value = "";
  };

  const count = () => {
    // https://thewebdev.info/2021/05/15/how-to-count-duplicate-values-in-an-array-in-javascript/

    const counts = {};
    userArray.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    setcountUnique(counts);
  };

  // DISPLAY THEM
  // https://www.pluralsight.com/guides/how-to-display-key-and-value-pairs-from-json-in-reactjs

  // SORTING THEM FROM OBJECT
  // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

  // The ONE I USED
  // https://stackoverflow.com/questions/43773092/how-to-sort-objects-by-value
  const displayResults = () =>
    Object.keys(countUnique)
      .sort((a, b) => {
        return countUnique[b] - countUnique[a];
      })
      .map((k, i) => {
        return (
          <li className="list-group-item" key={i}>
            {k}:{countUnique[k]}
          </li>
        );
      });

  const endGame = () => {
    setTimerOn(false);
    setRefreshTimer(null);
    setRefresh(false);
    setSeconds(refreshTimer);
    setUpdateTime(false);
    setGameStart(false);
    setUserArray([]);
    setcountUnique({});
    setAlerts({
      error: "",
      success: "",
      FIB: "",
    });
    setGameOver(true);
    setTimeout(() => {
      setGameOver(false);
    }, 5000);
  };

  useEffect(() => {
    count();
  }, [refresh]);

  return (
    <div className="App">
      {gameOver && <h1 className="gameOver">Thanks For Playing =D</h1>}

      <div className="container" style={{ maxWidth: "1000px" }}>
        {gameStart && (
          <button
            className="btn btn-outline-danger mb-3"
            style={{ position: "absolute", top: "2em", right: "2em" }}
            type="button"
            onClick={endGame}
          >
            End Game
          </button>
        )}
        <h1 className="mt-5 mb-4">Fib The Record</h1>
        <div className="row">
          <div className="col-sm-10 m-auto">
            <div className="row">
              <div className="col-sm-6 text-start">
                <p>
                  Input a time and then press play to start the game. Once the
                  game starts you can add numbers and update the refresh time by
                  inputting values and pressing the respective buttons. To end
                  the game just press the button in the top right.
                </p>
              </div>
              <div className="col-sm-6 m-auto">
                <form onSubmit={handleTime}>
                  <div className="input-group mb-3">
                    <input
                      id="time"
                      type="number"
                      className="form-control"
                      placeholder="Time (seconds)"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-primary" type="submit">
                        {gameStart ? "Update" : "Play"}
                      </button>
                    </div>
                  </div>
                </form>

                {gameStart ? "" : error && showErrorMessage(error)}
              </div>
            </div>
          </div>
        </div>

        {/* space */}
        {gameStart ? (
          <FadeIn>
            <div className="row">
              <div className="col-sm-10 m-auto">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div className="col-6">
                        <form onSubmit={handleChangeArray}>
                          <div className="input-group mb-3">
                            <input
                              id="userNum"
                              type="number"
                              className="form-control"
                              placeholder="Add a number!"
                              aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="submit"
                                // onClick={handleChangeArray}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-6">
                        <Timer
                          refreshTimer={refreshTimer}
                          updateTime={updateTime}
                          setUpdateTime={setUpdateTime}
                          seconds={seconds}
                          setSeconds={setSeconds}
                          refresh={refresh}
                          setRefresh={setRefresh}
                          timerOn={timerOn}
                          setTimerOn={setTimerOn}
                        />
                      </div>
                      {gameStart ? error && showErrorMessage(error) : ""}
                      {FIB && showFIBMessage()}
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    {displayResults()}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        ) : (
          <div className="row">
            <div className="col-sm-10 m-auto">
              <img
                src="/images/FibGif.gif"
                style={{ width: "400px", marginTop: "1em" }}
                alt="FibGif"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
