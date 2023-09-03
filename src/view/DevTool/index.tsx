import { useState } from 'react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
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

  const files = {
    '/App.ts': {
      code: `interface MyData {
        id:string,
        age: number,
        sex: number
      }
      function showEverything(list: MyData[]){
        list.forEach(item => console.log(item.age))
      }
      const persons:MyData[] = [
        {
          id: '001',
          age: 18,
          sex: 1
        },
        {
          id: '002',
          age: 23,
          sex: 2
        }
      ]
      showEverything(persons)
      `,
    },
  };
  return (
    <>
      <div>
        <div>
          <SandpackProvider
            template="vanilla"
            theme="dark"
            files={files}
            options={sandboxConfig}
          >
            <SandpackLayout>
              {/* <SandpackCodeEditor /> */}
              <MonacoEditor />
              <SandpackPreview style={{ height: '70vh' }} />
            </SandpackLayout>
          </SandpackProvider>
        </div>
        <div>{/* <Terminal /> */}</div>
      </div>
    </>
  );
}

export default Sandbox;
