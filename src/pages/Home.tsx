import { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { Logo } from "../assets";
import { SignUp } from "../pages";
import { Projects } from "../components";

const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState<boolean>(false);
  const [user, setuser] = useState(null);

  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          {isSideMenu ? (
            <HiChevronDoubleRight className="text-white text-xl" />
          ) : (
            <HiChevronDoubleLeft className="text-white text-xl" />
          )}
        </motion.div>

        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"} className="flex items-center text-white">
            <img
              src={Logo}
              alt="logo"
              className="w-16 h-16 object-contain rounded-md bg-white"
            />
            <span className="ml-3 tracking-wider text-2xl font-bold">
              Codepen Clone
            </span>
          </Link>
          <Link to={"/new-project"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>

          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-6"
            >
              <MdHome className="text-primaryText text-xl" />
              <p className="text-lg text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3">
            <FaSearchengin className="text-2xl text-primaryText" />
            <input
              type="text"
              className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="Search here..."
            />
          </div>
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg curosr-pointer hover:bg-emeral-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <div></div>}
        </div>

        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
