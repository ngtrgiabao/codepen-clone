import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home, NewProject } from "./pages";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        setDoc(
          doc(db, "users", userCredentials?.uid),
          userCredentials?.providerData[0],
        ).then(() => {
          dispatch(SET_USER(userCredentials?.providerData[0]));
          navigate("/home/projects", { replace: true });
        });
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 1200);
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-primary flex-col">
          <Spinner />
          <div className="flex flex-col items-center text-white mt-2">
            <span className="text-4xl font-bold mb-2">Codepen Clone</span>
            <span className="text-xs font-extralight">
              &copy; Powered by Yanji - Nguyen Tran Gia Bao
            </span>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-starts justify-start overflow-hidden bg-primary">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
