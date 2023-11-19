import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import { DraggableList } from "./feature/draggable-list";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="*" element={<DraggableList />} />
    </Routes>
  );
}

export default App;
