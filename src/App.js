import { useEffect, useState } from "react";

// Components
import Timer from "./components/timer/timer";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // state
  const [startTime, setStartTime] = useState(20);
  const [update, setUpdate] = useState(false);
  const [numbers, setNumbers] = useState([]);
  // const [userInputs, setUserInputs] = useState({
  //   startTime: 200,
  //   numbers: [],
  // });

  // const { startTime, numbers } = userInputs;
  // functions
  // const handleChange = (props) => (e) => {
  //   setUserInputs({
  //     ...userInputs,
  //     [props]: e.target.value,
  //   });
  //   console.log(startTime);
  // };

  // useEffect(() => {

  // }, [])

  return (
    <div className="App">
      <h1>Fib The Record</h1>
      <div>
        <p>timer refresh</p>
        <input
          type="number"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={() => setUpdate(true)}>
          update
        </button>
      </div>
      <div>
        <p>Your numbers</p>
        <input type="number" />
        <button className="btn btn-primary">add</button>
      </div>
      <div>
        <Timer startTime={startTime} update={update} setUpdate={setUpdate} />
      </div>
    </div>
  );
}

export default App;
