import "./App.css";
import DDFileUpload from "./DDFileUpload";
import DDUploader from "./DDUploader";

function App() {
  return (
    <div className="App">
      <DDFileUpload labelText="Drag drop segments *.csv file here" />
    </div>
  );
}

export default App;
