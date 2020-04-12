import React, { useState, useEffect } from "react";
import "./App.css";
import PrivateRoutes from "./private-routes/PrivateRoutes";
import LocalStorageService from "../services/LocalStorageService";

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  return (
    <div className="App">
      <PrivateRoutes setRole={setRole} role={role} />
    </div>
  );
}

export default App;
