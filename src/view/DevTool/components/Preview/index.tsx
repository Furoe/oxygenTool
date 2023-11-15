import { useEffect, useRef, useState } from 'react';
import { bundle } from '../../bundler';
import { inputFile } from '../../bundler/types';

const defaultTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo-64.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>preview</title>
  </head>
  <body
    class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
  >
    <div>hello world</div>
  </body>
</html>`;

interface PreviewProps {
  files: inputFile[];
  bindConsole: (el) => void;
}

function Preview({ files, bindConsole }: PreviewProps) {
  const [srcDoc, setSrcDoc] = useState(defaultTemplate);
  const iframeEl = useRef(null);
  useEffect(() => {
    try {
      bundle(files, 'temp').then((res) => {
        setSrcDoc(`<!DOCTYPE html>
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
            <script>
            ${res}
            </script>
          </body>
        </html>
        `);
      });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (iframeEl) {
      bindConsole(iframeEl.current);
    }
  }, [iframeEl.current]);

  return (
    <>
      <iframe
        title="preview"
        className="w-full h-3/4 bg-white"
        sandbox="allow-modals allow-forms allow-same-origin allow-scripts"
        srcDoc={srcDoc}
        ref={iframeEl}
      />
    </>
  );
}

export default Preview;
