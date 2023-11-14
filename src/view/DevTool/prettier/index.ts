import * as monaco from 'monaco-editor';
import { format } from './worker';

export async function registerDocumentFormattingEditProviders() {
  const disposables: monaco.IDisposable[] = [];

  const formattingEditProvider = {
    async provideDocumentFormattingEdits(
      model: monaco.editor.ITextModel,
      _options: monaco.languages.FormattingOptions,
      _token: monaco.CancellationToken
    ) {
      const pretty = await format({
        language: model.getLanguageId(),
        value: model.getValue(),
      });
      return [
        {
          range: model.getFullModelRange(),
          text: pretty,
        },
      ];
    },
  };

  ['css', 'less', 'scss', 'javascript', 'typescript', 'html'].forEach((id) => {
    disposables.push(
      monaco.languages.registerDocumentFormattingEditProvider(
        { language: id, exclusive: true },
        formattingEditProvider
      )
    );
  });

  return {
    dispose() {
      disposables.forEach((disposable) => disposable.dispose());
    },
  };
}
