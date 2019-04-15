// tslint:disable:no-console
import { fetch, alert } from '@ephox/dom-globals';
import { checkResponse } from './core/CheckResponse';

declare const tinymce: any;
interface IGeneratedContentResult {
    input: string;
    result: string;
    cleanResult: string;
}

const pleaseWaitMessage = 'Your AI content editor is working hard, please wait (30~40s) .';
const getUrlFromInput = (input: string) =>
    `/api/ai-contenteditor/please-finish-my?sentence=${input}`;

const useResponse = (editor: any) => (response: IGeneratedContentResult) => {
    console.log(response);
    editor.setContent(response.cleanResult);
};

const handleError = (editor: any, input: string) => (ex: any) => {
    console.log(ex);
    alert('Something went wrong, check console');
    // Set old content
    editor.setContent(input);
};

const startWait = (editor: any) => {
    editor.setProgressState(true);
    editor.setContent(pleaseWaitMessage);
    const intervalId = setInterval(() => {
        editor.setContent(`${editor.getBody().textContent}.`);
    }, 500);
    return intervalId;
};

const stopWait = (editor: any, intervalId: any) => {
    editor.setProgressState(false);
    clearInterval(intervalId);
    editor.focus();
};

const setup = (editor: any, url: any) => {
    editor.addButton('epi-tinymce-ai-plugin', {
        tooltip: 'Generate text',
        image: 'https://openai.com/favicon.png',
        onclick: () => {
            // Get input
            const input: string = editor.getBody().textContent;

            if (input.startsWith(pleaseWaitMessage)) {
                alert('Please wait a bit or remove the wait message.');
                return;
            }

            // Init waiting state
            const intervalId = startWait(editor);

            // Do request
            const inputUrl = getUrlFromInput(input);
            fetch(inputUrl)
                .then((response) => {
                    stopWait(editor, intervalId);
                    return response;
                })
                .then(checkResponse)
                .then(useResponse(editor))
                .catch(handleError(editor, input));
        },
    });
};

tinymce.PluginManager.add('epi-tinymce-ai-plugin', setup);

// tslint:disable-next-line:no-empty
export default () => {};
