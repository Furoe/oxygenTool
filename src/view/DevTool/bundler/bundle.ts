import esbuild from 'esbuild-wasm';
import {
  compile,
  middleware,
  prefixer,
  RULESET,
  serialize,
  stringify,
} from 'stylis';
import { inputFile } from './types';
import { inferLoader } from './utils';

function injectCSS(css: string, id: string) {
  return `
  (function (){
    let styleEl = document.querySelector("[data-o-style-id=${id}]");
    if(!styleEl){
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-o-style-id', '${id}');
      document.head.appendChild(styleEl);
    }
    styleEl.innerHtml = ${JSON.stringify(css)};
  })()
  `;
}

function compileCSSModule(css: string, buildId: string) {
  const classMapping = {};
  const res = serialize(
    compile(css),
    middleware([
      (element) => {
        if (element.length > -1) {
          if (element.type === RULESET || element.props) {
            element.props = (
              Array.isArray(element.props)
                ? [...element.props]
                : [element.props]
            ).map((prop) => {
              return prop.replace(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g, (m) => {
                const varName = m.slice(1);
                if (!classMapping[varName]) {
                  classMapping[varName] = `${varName}_${buildId}`;
                }
                return `.${classMapping[varName]}`;
              });
            });
          }
        }
      },
      stringify,
    ])
  );
  return {
    contents: `${injectCSS(res, buildId)}
    exports default ${JSON.stringify(classMapping)}`,
  };
}

function compileScopedCSS(css: string, buildId: string) {
  const res = serialize(
    compile(`.${buildId}{${css}}`),
    middleware([prefixer, stringify])
  );
  return {
    contents: injectCSS(res, buildId),
  };
}

function compileGlobalCSS(css: string, buildId: string) {
  const res = serialize(compile(css), middleware([prefixer, stringify]));
  return {
    contents: injectCSS(res, buildId),
  };
}

let _init: Promise<void> | null = null;

const initEsbuild = async () => {
  try {
    if (!_init) {
      _init = esbuild.initialize({
        wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
      });
      await _init;
    }
  } catch (err: any) {
    if (!err.toString().includes('Cannot call "initialize" more than once')) {
      throw err;
    }
  }
};

const RESOLVE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', ''];
const RESOLVE_NAMESPACE = 'playground-input';

function resolvePlugin(files: inputFile[], buildId: string): esbuild.Plugin {
  return {
    name: 'resolve',
    setup(build) {
      build.onStart(() => {
        // pass
      });
      build.onEnd(() => {
        // pass
      });
      build.onResolve({ filter: /.*/ }, (args) => {
        // if (/^https?:\/\//.test(args.path)) {
        //   throw new Error(`importing HTTP modules is not supported`);
        // }
        let file: inputFile | undefined = files.find(
          (f) => f.name === args.path
        );
        if (!file && args.path.startsWith('./')) {
          for (const ext of RESOLVE_EXTENSIONS) {
            file = files.find((f) => './' + f.name === args.path + ext);
            if (file) {
              break;
            }
          }
          if (!file) {
            throw new Error(`'${args.path}' not found`);
          }
        }
        if (file) {
          return {
            path: file.name,
            namespace: RESOLVE_NAMESPACE,
          };
        }
        return {
          path: args.path,
          external: true,
        };
      });
      build.onLoad(
        { filter: /.*/, namespace: RESOLVE_NAMESPACE },
        async (args) => {
          const file = files.find((f) => f.name === args.path);
          if (file) {
            if (/\.modules?.css$/.test(file.name)) {
              return compileCSSModule(file.value, buildId);
            } else if (/\.global.css$/.test(file.name)) {
              return compileGlobalCSS(file.value, buildId);
            } else if (/\.css$/.test(file.name)) {
              return compileScopedCSS(file.value, buildId);
            }
            return {
              contents: file.value,
              loader: inferLoader(file.name),
            };
          }
        }
      );
    },
  };
}

export async function bundle(files: inputFile[], buildId: string) {
  if (!files.length || !buildId) {
    return;
  }
  let buildError = '';
  try {
    await initEsbuild();
    const res = await esbuild.build({
      entryPoints: [files[0].name],
      format: 'cjs',
      bundle: true,
      plugins: [resolvePlugin(files, buildId)],
      // incremental: true,
      treeShaking: false,
      sourcemap: false,
      target: 'esnext',
    });
    const code = res.outputFiles?.map((f) => f.text).join('\n') ?? '';
    return code;
  } catch (err: any) {
    if (err.errors) {
      // pass
    } else if (err instanceof Error) {
      buildError = err.message;
    } else {
      // pass
    }
    if (buildError) {
      throw new Error(err);
    }
  }
}
