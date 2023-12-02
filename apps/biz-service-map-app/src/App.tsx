import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import { ServiceMap } from "./feature/service-map";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="*" element={<ServiceMap />} />
    </Routes>
  );
}

export default App;
