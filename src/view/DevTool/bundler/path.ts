export function extname(path: string): string {
  const m = /(\.[a-zA-Z0-9]+)$/.exec(path);
  return m ? m[1] : '';
}
