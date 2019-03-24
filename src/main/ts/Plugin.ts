declare const tinymce: any;

const setup = (editor, url) => {
  editor.addButton('epi-tinymce-ai-plugin', {
    text: 'epi-tinymce-ai-plugin button',
    icon: false,
    onclick: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from epi-tinymce-ai-plugin</p>');
    }
  });
};

tinymce.PluginManager.add('epi-tinymce-ai-plugin', setup);

// tslint:disable-next-line:no-empty
export default () => {};
