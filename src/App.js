import { useEffect, useState } from "react";
import { showErrorMessage, showFIBMessage } from "./components/alerts/alerts";
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
    FIB: "",
  });
  const { error, FIB } = alerts;
  //

  // functions

  // The fibonacci function will find the 'nth' number of the fibonacci sequence. for example, fibonacci(10) will return 55.
  // This function is not required for this assessment, I just thought it was cool.
  // If you are worried about space/time complexities and want to save your program from computing this, just google the 1000th number of the fibonacci sequence (354,224,848,179,261,915,075) and use that in the fibCheck function instead.

  //To store the fibonacci function values
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

  // To check if a number is part of the fibonacci sequence the square root of 5n^2 + 4 or 5n^2 - 4 must be a whole number (not a decimal/floating point).

  // The default radix for parseInt is 10 so any number (n) will be rounded to the nearest integer.
  // If the number has been rounded then s * s !== n and the function will return false. Else it will return true.
  const perfectSquare = (n) => {
    let s = parseInt(Math.sqrt(n));
    return s * s === n;
  };

  // fibCheck will return true if the user inputs a number a number equal to or less than the 1000th fibonacci number.
  const fibCheck = (n) => {
    if (n <= fibonacci(fibRange)) {
      return perfectSquare(5 * n * n + 4) || perfectSquare(5 * n * n - 4);
    }
  };

  const handleChangeArray = (e) => {
    // stop form submission because it will refresh the page
    e.preventDefault();

    // get user input
    let userNum = document.getElementById("userNum").value;

    // remove leading 0's. Prevents 00012 as a value and converts it to 12.
    if (userNum !== "0") {
      userNum = userNum.replace(/\b0+/g, "");
    }
    if (userNum !== "") {
      // add input values into an array of all user numbers
      setUserArray([...userArray, userNum]);

      // returns true is user number is part of the fibonacci sequence
      if (fibCheck(Number(userNum))) {
        // makes FIB = a string and this will display on the page
        setAlerts({
          error: "",
          FIB: "FIB",
        });
        // after .5 seconds this will set FIB back to blank so that the "FIB" alert doesnt stay on the screen
        setTimeout(() => {
          setAlerts({
            error: "",
            FIB: "",
          });
        }, 500);
      } else {
        setAlerts({
          error: "",
          FIB: "",
        });
      }
    } else {
      setAlerts({
        // handles blank submission
        error: "No number added",
        FIB: "",
      });
    }
    // resets input field back to no content
    document.getElementById("userNum").value = "";
  };

  const handleTime = (e) => {
    // stop form submission because it will refresh the page
    e.preventDefault();

    // get user time input
    let time = document.getElementById("time").value;

    //  regex that does not allow negative or decimals
    const validate = /^\d+$/;

    // removes leading 0's
    time = time.replace(/\b0+/g, "");

    //  checks if input is a number, does not allow negative or decimals
    if (validate.test(time)) {
      // keeps track of the refresh time
      setRefreshTimer(time);

      // changes value of this varable to trigger the useEffect again
      setUpdateTime(!updateTime);

      // keeps track game status. true = playing false = game over
      setGameStart(true);

      // this variale is passed to the timer component to turn timer on/off. Used for stop start functionality.
      setTimerOn(true);

      // clears alerts
      setAlerts({
        error: "",
        FIB: "",
      });
    } else {
      // error handling
      setAlerts({
        ...alerts,
        error: "must enter a positive whole number",
      });
      // resets input field back to no content
      document.getElementById("time").value = "";
    }
    // resets input field back to no content
    document.getElementById("time").value = "";
  };

  //
  const count = () => {
    const counts = {};
    userArray.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    setcountUnique(counts);
  };
  // DISPLAY THEM

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
                src="./images/fibgif.gif"
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
