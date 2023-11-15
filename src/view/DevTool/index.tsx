import { useEffect, useRef, useState } from 'react';
import FileTab from './components/FileTab';
import Editor from './components/MonacoEditor';
import Preview from './components/Preview';
import { Terminal } from './components/Terminal';
import { inputFile } from './bundler/types';

function Sandbox() {
  const files: inputFile[] = [
    {
      name: 'main.tsx',
      language: 'typescript',
      value: `
      import './style.css'
      const str:string = '123';
      console.log(str)
      `,
    },
    {
      name: 'style.css',
      language: 'css',
      value: '.label{color:green;}',
    },
    {
      name: 'style.scss',
      language: 'scss',
      value: '.label{color:green;}',
    },
  ];

  const [fileName, setFileName] = useState('main.tsx');
  const [iframeConsole, setIframeConsole] = useState(null);
  const file = files.find((f) => f.name === fileName) as inputFile;

  const updateFile = (path: string, value: string) => {
    const file = files.find((f) => f.name === path) as inputFile;
    file.value = value;
  };

  const handleBindConsole = (el) => {
    setIframeConsole(el.contentWindow.console);
  };

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-1/2">
          <FileTab
            tabNames={files.map((f) => f.name)}
            activeTab={fileName}
            toggleTab={(fileName: string) => setFileName(fileName)}
          />
          <Editor
            // width="100%"
            // height="70vh"
            path={file.name}
            defaultLanguage={file.language}
            theme="vs-dark"
            defaultValue={file.value}
            onChange={updateFile}
          />
        </div>
        <div className="w-1/2">
          <Preview files={files} bindConsole={handleBindConsole} />
          <Terminal hackConsole={iframeConsole} />
        </div>
        {/* <div className="w-full">
          <Terminal hackConsole={iframeConsole} />
        </div> */}
      </div>
    </>
  );
}

export default Sandbox;
