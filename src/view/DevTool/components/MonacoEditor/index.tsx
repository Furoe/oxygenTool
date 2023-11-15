import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { registerDocumentFormattingEditProviders } from '@/view/DevTool/prettier';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import usePrevious from '@/hooks/usePrevious';
import styles from './Editor.module.scss';

interface EditorProps {
  path: string;
  defaultLanguage: string;
  theme: string;
  defaultValue: string;
  onChange: (path: string, value: string) => void;
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
  onChange,
}: EditorProps) {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);
  const previousPath = usePrevious(path);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;
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
    if (editor) {
      const listener = editor.onDidChangeModelContent(() => {
        onChange(path, editor.getValue());
      });
      return () => {
        listener.dispose();
        editor.dispose();
      };
    }
  }, [monacoEl.current]);

  useEffect(() => {
    if (editor && path) {
      if (viewStates.has(path)) {
        const { model, state } = viewStates.get(path);
        editor?.setModel(model);
        editor.restoreViewState(state);
      } else {
        const model = monaco.editor.createModel(
          defaultValue,
          defaultLanguage,
          monaco.Uri.parse(path)
        );
        const state = editor.saveViewState();
        viewStates.set(path, {
          model,
          state: null,
        });
        if (previousPath) {
          viewStates.set(previousPath, {
            model: viewStates.get(previousPath).model,
            state,
          });
        }

        editor?.setModel(model);
        editor.trigger('a', 'editor.action.formatDocument', undefined);
      }
      const listener = editor.onDidChangeModelContent(() => {
        onChange(path, editor.getValue());
      });
      return () => {
        listener.dispose();
      };
    }
  }, [path]);

  useEffect(() => {
    if (monacoEl.current && editor) {
      const observer = new ResizeObserver(() => {
        window.setTimeout(() => editor.layout(), 0);
      });
      observer.observe(monacoEl.current);
      console.log(observer);
      return () => {
        observer.disconnect();
      };
    }
  }, [editor]);

  return (
    <>
      <div className="w-full h-full" ref={monacoEl}></div>
    </>
  );
}

export default Editor;
