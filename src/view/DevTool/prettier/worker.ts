import prettier from 'prettier/standalone';

const options = {
  html: async () => ({
    parser: 'html',
    plugins: [await import('prettier/parser-html')],
    printWidth: 100,
  }),
  typescript: async () => ({
    parser: 'typescript',
    plugins: [await import('prettier/parser-typescript')],
    printWidth: 100,
  }),
  css: async () => ({
    parser: 'css',
    plugins: [await import('prettier/parser-postcss')],
    printWidth: 100,
  }),
  less: async () => ({
    parser: 'less',
    plugins: [await import('prettier/parser-postcss')],
    printWidth: 100,
  }),
  scss: async () => ({
    parser: 'scss',
    plugins: [await import('prettier/parser-postcss')],
    printWidth: 100,
  }),
  javascript: async () => ({
    parser: 'babel',
    plugins: [await import('prettier/parser-babel')],
    printWidth: 100,
    semi: false,
    singleQuote: true,
  }),
};

export async function format({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  const opts = await options[language]();
  return prettier.format(value, opts);
}
