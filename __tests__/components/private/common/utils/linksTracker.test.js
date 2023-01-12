import { screen, fireEvent } from '@testing-library/react';
import {
    addPositionInNote,
    createIntersectionObserverForLinks
} from '../../../../../components/private/common/utils/linksTracker';

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

const notaBody = global.document.body;

describe('components - private - common - utils - linksTracker', () => {
    describe('createIntersectionObserverForLinks', () => {
        test('When navigate should observe links inside body, call observe, call unobserve and callback must push events in data layer', () => {
            Object.defineProperty(window, 'performance', {
                value: {
                    getEntriesByType: jest
                        .fn()
                        .mockReturnValue([{ type: 'navigate' }]),
                    measure: jest.fn()
                }
            });

            const mockedEntries = [
                {
                    isIntersecting: true,
                    target: paragraph
                },
                {
                    isIntersecting: true,
                    target: linkButton
                }
            ];

            const mockedbody = [notaBody];

            const observe = jest.fn();
            const unobserve = jest.fn();
            const takeRecords = jest.fn(() => mockedEntries);

            window.IntersectionObserver = jest.fn(() => ({
                observe,
                unobserve,
                takeRecords
            }));

            jest.spyOn(document, 'querySelectorAll').mockReturnValueOnce(
                mockedbody
            );

            const observer = createIntersectionObserverForLinks();

            const [callback] = window.IntersectionObserver.mock.calls[0];
            callback(mockedEntries, observer);

            expect(observe).toBeCalledTimes(2);
            expect(unobserve).toBeCalledTimes(2);
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'impressionNota',
                    ctr_brand: 'linkParrafo_01',
                    ctr_position: '111101'
                },
                {
                    event: 'impressionNota',
                    ctr_brand: 'linkInterstial_01',
                    ctr_position: '111101'
                }
            ]);
        });
        test('click must sent event to dataLayer', () => {
            const Button = screen.getByRole('button');
            fireEvent.click(Button);
            expect(window.dataLayer).toStrictEqual([
                {
                    event: 'impressionNota',
                    ctr_brand: 'linkParrafo_01',
                    ctr_position: '111101'
                },
                {
                    event: 'impressionNota',
                    ctr_brand: 'linkInterstial_01',
                    ctr_position: '111101'
                },
                {
                    event: 'productClickNota',
                    ctr_brand: 'linkInterstial_01',
                    ctr_position: '111101'
                }
            ]);
        });
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
