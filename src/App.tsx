import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import { useEffect } from "react";
import { auth } from "./config/firebase.config";

function App() {
  const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userCredentials=>{
      if(userCredentials) {
        console.log(userCredentials?.providerData[0]);
      } else {
        navigate("/home/auth", {replace: true});
      }
    })
  },[navigate])
  
  return (
    <>
      <div className="w-screen h-screen flex items-starts justify-start overflow-hidden bg-primary">
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
