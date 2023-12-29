// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfileDetails, Alert } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("Untitled");
  const [isTitle, setIsTitle] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user?.user);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
    <head>
    <style>${css}</style>
    </head>
    <body>${html}</body>
    <script>${js}</script>
    </html>
    `;

    setOutput(combinedOutput);
  };

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: css,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    await setDoc(doc(db, "projects", id), _doc)
      .then(() => {
        setAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setInterval(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      <AnimatePresence>
        {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
      </AnimatePresence>

      <header className="w-full flex items-center justify-between px-12 py-4 z-10">
        <div className="flex items-center justify-center gap-6">
          <Link
            to={"/home/projects"}
            className="flex items-center text-white font-bold"
          >
            <img
              className="w-10 h-10 bg-white rounded-md mr-2 object-contain"
              src={Logo}
              alt=""
            />
            <span>
              Codepen <br /> Clone
            </span>
          </Link>

          <div className="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center gap-3">
              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.input
                      key={"titleInput"}
                      type="text"
                      placeholder="Your title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                    />
                  </>
                ) : (
                  <>
                    <motion.p
                      key={"titleLable"}
                      className="px-3 py-2 text-white text-lg"
                    >
                      {title}
                    </motion.p>
                  </>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.div
                      key={"MdCheck"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(false)}
                    >
                      <MdCheck className="text-2xl text-emerald-500" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      key={"MdEdit"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(true)}
                    >
                      <MdEdit className="text-2xl text-primaryText" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* follow */}
            <div className="flex items-center justify-center px-3 -mt-2">
              <p className="text-primaryText text-sm">
                {user?.displayName
                  ? user?.displayName
                  : `${user?.email.split["@"][0]}`}
              </p>
              <motion.p
                whileTap={{ scale: 0.9 }}
                className="text-[12px] bg-emerald-500 rounded-sm px-2 py-[1px] text-white font-semibold ml-2 cursor-pointer"
              >
                + Follow
              </motion.p>
            </div>
          </div>
        </div>

        {/* user section */}
        {user && (
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={saveProgram}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-4 bg-primaryText curosr-pointer text-base text-primary font-semibold rounded-md"
            >
              Save
            </motion.button>
            <UserProfileDetails />
          </div>
        )}
      </header>

      {/* coding section */}
      <div>
        <SplitPane
          split="horizontal"
          minSize={100}
          maxSize={-100}
          defaultSize={"50%"}          
        >
          {/* top coding section */}
          <SplitPane
            className="mt-24"
            split="vertical"
            minSize={500}
            maxSize={-100}
          >
            {/* html code */}
            <div className="w-full h-full flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between">
                <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className="text-primaryText font-semibold border-t-gray-500">
                    HTML
                  </p>
                </div>

                {/* icons */}
                <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaChevronDown className="text-xl text-primaryText" />
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror
                  value={html}
                  height="600px"
                  theme={aura}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value: string) => {
                    setHtml(value);
                  }}
                />
              </div>
            </div>

            <SplitPane minSize={500}>
              {/* css code */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                    <FaCss3 className="text-xl text-sky-500" />
                    <p className="text-primaryText font-semibold border-t-gray-500">
                      CSS
                    </p>
                  </div>

                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={css}
                    height="600px"
                    theme={aura}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value: string) => {
                      setCss(value);
                    }}
                  />
                </div>
              </div>

              {/* js code */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                    <FaJs className="text-xl text-yellow-500" />
                    <p className="text-primaryText font-semibold border-t-gray-500">
                      JavaScript
                    </p>
                  </div>

                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={js}
                    height="600px"
                    theme={aura}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value: string) => {
                      setJs(value);
                    }}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>

          {/* bottom result section */}
          <div
            className="bg-white"
            style={{
              overflow: "hidden",
              height: "100%",
            }}
          >
            <iframe
              title="result"
              srcDoc={output}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default NewProject;
