import { Response } from '@ephox/dom-globals';

export const checkResponse = (response: Response) => {
    if (!response.ok) {
        // tslint:disable-next-line: no-console
        console.log(response);
        throw new Error('Network response was not ok.');
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    throw new TypeError('Oops, we did not receive JSON!');
};
