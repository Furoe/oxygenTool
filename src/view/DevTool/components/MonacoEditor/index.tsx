import {
  FileTabs,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import Editor from '@monaco-editor/react';

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        language="typescript"
        theme="vs-dark"
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={(value) => updateCode(value || '')}
      />
    </>
  );
}

export default MonacoEditor;
