import "./App.css";
import { Weather } from "./Components/Weather";
import "./scss/weather.scss";

function App() {
  return (
    <div className="App">
      <h1>THỜI TIẾT</h1>
      <Weather />
    </div>
  );
}

export default App;
