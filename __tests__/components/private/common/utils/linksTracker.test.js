import { screen, fireEvent } from '@testing-library/react';
import { addPositionInNote } from '../../../../../components/private/common/utils/linksTracker';

global.window.dataLayer = [];

let paragraph = global.document.createElement('p');
let link = global.document.createElement('a');
link.classList.add('com-link');
let linkButton = global.document.createElement('a');
let button = global.document.createElement('button');

paragraph.appendChild(link);
paragraph.ctr_brand = 'linkParrafo_01';
paragraph.ctr_position = '111101';

linkButton.appendChild(button);
linkButton.ctr_brand = 'linkInterstial_01';
linkButton.ctr_position = '111101';

global.document.body.classList.add('cuerpo__nota');
global.document.body.appendChild(paragraph);
global.document.body.appendChild(linkButton);

describe('components - private - common - utils - linksTracker', () => {
    describe('createIntersectionObserverForLinks', () => {
        test('When reload, click mustnt sent event to dataLayer', () => {
            delete global.window;
            global.window = {
                dataLayer: []
            };
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'reload' }]),
                    measure: jest.fn()
                }
            });
            const Button = screen.getByRole('button');
            fireEvent.click(Button);
            expect(window.dataLayer).toStrictEqual([]);
        });
    });
    describe('addPositionInNote', () => {
        test('When object of HTML elements is given, add position in note', () => {
            const links = [{}, {}];

            links.forEach((link, i) => {
                addPositionInNote(link, i);
            });

            expect(links).toStrictEqual([
                { ctr_brand: 'linkParrafo_01', ctr_position: '111101' },
                { ctr_brand: 'linkParrafo_02', ctr_position: '111102' }
            ]);
        });
    });
});
