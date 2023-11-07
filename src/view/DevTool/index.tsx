import { useEffect, useRef, useState } from 'react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';
import FileTab from './components/FileTab';
import MonacoEditor from './components/MonacoEditor';
import { Terminal } from './components/Terminal';

function Sandbox() {
  // const files = {
  //   'script.js': {
  //     name: 'script.js',
  //     language: 'javascript',
  //     value: 'someJSCodeExample',
  //   },
  //   'style.css': {
  //     name: 'style.css',
  //     language: 'css',
  //     value: 'someCSSCodeExample',
  //   },
  //   'index.html': {
  //     name: 'index.html',
  //     language: 'html',
  //     value: 'someHTMLCodeExample',
  //   },
  // };
  const sandboxConfig = {
    showConsole: true,
    showConsoleButton: true,
    autorun: true,
    autoReload: true,
    visibleFiles: ['/App.ts'],
    activeFile: '/App.ts',
    showLineNumbers: true,
    showInlineErrors: true,
  };

  interface fileType {
    [index: string]: {
      name: string;
      language: string;
      value: string;
    };
  }

  const files: fileType = {
    'script.js': {
      name: 'script.js',
      language: 'javascript',
      value: "console.log('hello world)",
    },
    'style.css': {
      name: 'style.css',
      language: 'css',
      value: '.label{color:green;}',
    },
    'index.html': {
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
  };
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState('index.html');
  const file = files[fileName];
  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);
  return (
    <>
      <div>
        <div>
          {/* <SandpackProvider
            template="vanilla"
            theme="dark"
            files={files}
            options={sandboxConfig}
          >
            <SandpackLayout> */}
          {/* <SandpackCodeEditor /> */}

          {/* <SandpackPreview style={{ height: '70vh' }} />
            </SandpackLayout>
          </SandpackProvider> */}
          <button
            disabled={fileName === 'script.js'}
            onClick={() => setFileName('script.js')}
            className="mr-4"
          >
            script.js
          </button>
          <button
            disabled={fileName === 'style.css'}
            onClick={() => setFileName('style.css')}
            className="mr-4"
          >
            style.css
          </button>
          <button
            disabled={fileName === 'index.html'}
            onClick={() => setFileName('index.html')}
          >
            index.html
          </button>
          <FileTab tabNames={Object.keys(files)} activeTab={fileName} />
          <Editor
            className="mt-4"
            width="100%"
            height="70vh"
            path={file.name}
            defaultLanguage={file.language}
            theme="vs-dark"
            defaultValue={file.value}
            onMount={(editor) => (editorRef.current = editor)}
          />
        </div>
        <div>{/* <Terminal /> */}</div>
      </div>
    </>
  );
}

export default Sandbox;
