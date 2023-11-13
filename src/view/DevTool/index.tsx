import { useEffect, useRef, useState } from 'react';
import FileTab from './components/FileTab';
import Editor from './components/MonacoEditor';
import { bundle } from './bundler';
import { inputFile } from './bundler/types';

function Sandbox() {
  const files: inputFile[] = [
    {
      name: 'script.ts',
      language: 'typescript',
      value: `
      const str:string = '123';
      str = 3
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
    {
      name: 'index.html',
      language: 'html',
      value: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/logo-64.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OxygenTool</title>
        </head>
        <body
          class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
        >
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>`,
    },
  ];
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState('script.ts');
  const file = files.find((f) => f.name === fileName) as inputFile;
  console.log(file);
  // (async (files) => {
  //   try {
  //     const generateCode = await bundle(files, 'temp');
  //     console.log(generateCode);
  //   } catch (err) {}
  // })(files);
  // useEffect(() => {
  //   editorRef.current?.focus();
  // }, [file.name]);
  return (
    <>
      <div>
        <div>
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
            onMount={(editor) => (editorRef.current = editor)}
          />
        </div>
        <div></div>
        <div>{/* <Terminal /> */}</div>
      </div>
    </>
  );
}

export default Sandbox;
