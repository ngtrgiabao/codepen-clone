import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

const NewProject = () => {
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const [output, setOutput] = useState<string>("");

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

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      // TODO Fix height can't increase
      <div className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-6">
          <Link to={"/home/projects"}>
            <img className="w-20 h-20 object-contain" src={Logo} alt="" />
            Codepen
          </Link>
        </div>
      </div>

      {/* coding section */}
      <div>
        <SplitPane
          split="horizontal"
          minSize={100}
          maxSize={-100}
          defaultSize={"50%"}
        >
          {/* top coding section */}
          <SplitPane split="vertical" minSize={500} maxSize={-100}>
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
            <iframe title="result" srcDoc={output} />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default NewProject;
