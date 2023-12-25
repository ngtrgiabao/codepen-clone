import { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState<boolean>(false);
  const [isLogin, setLogin] = useState<boolean>(false);

  return (
    <div className="w-full py-6">
      <div className="text-white flex items-center">
        <div className="w-12 h-12 bg-white rounded-md ">
          <img src={Logo} alt="object-contain opacity-50" />
        </div>
        <span className="ml-3 text-2xl font-bold tracking-wider">
          Codepen Clone
        </span>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join With Us! 🥰</p>

        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          <UserAuthInput
            label="Email"
            placeholder="Email here..."
            isPass={false}
            key="email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeholder="Your password...."
            isPass={true}
            key="password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          {isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emeral-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emeral-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign In</p>
            </motion.div>
          )}

          <p className="text-sm text-primaryText flex items-center justify-center gap-3">
            {isLogin ? "Already have an account !" : "Don't have an account ?"}{" "}
            <span
              className="text-emerald-500 cursor-pointer hover:underline"
              onClick={() => setLogin(!isLogin)}
            >
              {isLogin ? "Login here" : "Create here"}
            </span>
          </p>

          <div className="flex items-center justify-center gap-12">
            <div className="rounded-md w-24 h-[1px] bg-textGray"></div>
            <span className="text-sm text-textGray uppercase">or</span>
            <div className="rounded-md w-24 h-[1px] bg-textGray"></div>
          </div>

          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-textGray backdrop-blur-md w-full py-3 rounded-xl hover:bg-lightGray cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>

          <div className="flex items-center justify-center gap-12">
            <div className="rounded-md w-24 h-[1px] bg-textGray"></div>
            <span className="text-sm text-textGray uppercase">or</span>
            <div className="rounded-md w-24 h-[1px] bg-textGray"></div>
          </div>

          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-textGray backdrop-blur-md w-full py-3 rounded-xl hover:bg-lightGray cursor-pointer"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
