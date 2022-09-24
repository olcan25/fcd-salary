import { useState } from "react";
import Navbar from "./layout/Navbar";
import Routers from "./routers";

function App() {
  return (
    <div>
      <Navbar />
      <Routers />
    </div>
  );
}

export default App;
