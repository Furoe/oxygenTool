import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { registerDocumentFormattingEditProviders } from '@/view/DevTool/prettier';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import styles from './Editor.module.scss';

interface EditorProps {
  path: string;
  defaultLanguage: string;
  theme: string;
  defaultValue: string;
  onMount: () => void;
}

registerDocumentFormattingEditProviders();

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
const viewStates = new Map();

function Editor({
  path,
  defaultLanguage,
  theme,
  defaultValue,
  onMount,
}: EditorProps) {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;
        if (viewStates.has(path)) {
          console.log('here');
        }
        const model = monaco.editor.createModel(
          defaultValue,
          defaultLanguage,
          monaco.Uri.parse(path)
        );
        const _editor = monaco.editor.create(monacoEl.current!, {
          theme,
        });
        viewStates.set(path, {
          model,
          state: null,
        });
        _editor.setModel(model);
        _editor.trigger('a', 'editor.action.formatDocument', undefined);
        return _editor;
      });
    }
    return () => {
      // monaco.editor.getModels().forEach((model) => model.dispose());
      // viewStates.clear();
      editor?.dispose();
      console.log(viewStates);
    };
  }, [monacoEl.current]);

  useEffect(() => {
    if (editor && path) {
      console.log(viewStates.has(path));
      if (viewStates.has(path)) {
        editor?.setModel(viewStates.get(path).model);
      } else {
        const model = monaco.editor.createModel(
          defaultValue,
          defaultLanguage,
          monaco.Uri.parse(path)
        );
        viewStates.set(path, {
          model,
          state: null,
        });
        editor?.setModel(model);
        editor.trigger('a', 'editor.action.formatDocument', undefined);
      }
    }
  }, [path]);

  return (
    <>
      <div className={styles.Editor} ref={monacoEl}></div>
    </>
  );
}

export default Editor;
