import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";
import { EMAIL_REGEX } from "../utils/regex";

interface UserAuthInputProps {
  label: string;
  placeholder: string;
  isPass: boolean;
  key: string;
  setStateFunction: Dispatch<SetStateAction<string>>;
  Icon: IconType;
  setGetEmailValidationStatus?: Dispatch<SetStateAction<boolean>>;
}

const UserAuthInput = ({
  label,
  placeholder,
  isPass,
  key,
  setStateFunction,
  Icon,
  setGetEmailValidationStatus,
}: UserAuthInputProps) => {
  const [value, setValue] = useState<string>("");
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (label === "Email") {
      const emailRegex = EMAIL_REGEX;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      if (setGetEmailValidationStatus) {
        setGetEmailValidationStatus(status);
      }
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label htmlFor="#" className="text-sm text-gray-300">
        {label}
      </label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-400 ${
          !isEmailValid &&
          label === "Email" &&
          value.length > 0 &&
          "border-2 border-red-500"
        }`}
      >
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPass && showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
          value={value}
          onChange={handleTextChange}
        />

        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setshowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? (
              <FaEye className="text-text555 text-2xl" />
            ) : (
              <FaEyeSlash className="text-text555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
