import Navbar from "./layout/Navbar";
import Routers from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routers />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
