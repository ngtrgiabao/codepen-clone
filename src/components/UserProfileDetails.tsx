import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Menus } from "../utils/Menus";
import { Link } from "react-router-dom";
import { signOutAction } from "../utils/helpers";
import { useState } from "react";
import { slideUpOut } from "../utils/styles/animations";

const UserProfileDetails = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user?.user);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <motion.img
            whileTap={{ scale: 1.2 }}
            src={user?.photoURL}
            alt={user?.displayName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          ></motion.img>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>

      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideUpOut}
            className="bg-secondary absolute top-16 right-0 px-2 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus &&
              Menus.map((menu) => (
                <Link
                  to={menu.uri}
                  key={menu.id}
                  className="text-primaryText text-lg hover:bg-extraLightGray px-2 py-1 w-full rounded-md"
                >
                  {menu.name}
                </Link>
              ))}

            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-red-500 text-lg hover:bg-extraLightGray px-2 py-1 w-full rounded-md cursor-pointer font-bold"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
