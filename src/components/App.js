import React, { useState, useEffect } from "react";
import "./App.css";
import PrivateRoutes from "./private-routes/PrivateRoutes";

function App() {
  const [role, setRole] = useState("guest");

  useEffect(() => {
    if(localStorage.getItem("TOKEN")){
      setRole('maker')
    }
  }, [])

  return (
    <div className="App">
      <PrivateRoutes setRole={setRole} role={role} />
    </div>
  );
}

export default App;
