import { useState } from "react";
import "./App.scss";
import MultiSelectDropDown from "./components/inputs/MultiSelectDropDown";
import { categories } from "./mock/categories";
import { Option } from "./types/Option";

function App() {
  const [value, setValue] = useState<Option[]>([]);
  return (
    <div className="App">
      <section className="App-section">
        <div className="container">
          <div style={{ margin: 10, height: 40 }}>
            Selected Options at parent:{" "}
            {value.map((item) => item.label).join(",")}
          </div>
          <MultiSelectDropDown onChange={setValue} options={categories} />
        </div>
      </section>
    </div>
  );
}

export default App;
