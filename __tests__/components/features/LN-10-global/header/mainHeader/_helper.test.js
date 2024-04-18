import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import {
    showSubscribeButton,
    getTermicaValues,
    getInitialState
} from '../../../../../../components/features/LN-10-global/header/mainHeader/_helper';
import useSiteServices from '../../../../../../components/features/LN-10-global/hooks/useSiteServices';
import siteServicesMock from '../../../../../../__mocks__/data/siteServices/siteServices.json';

jest.mock(
    '../../../../../../components/features/LN-10-global/hooks/useSiteServices',
    () => jest.fn()
);

jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => ({
        state: {
            siteService: {
                termicas: [
                    { key: 'class_tooltip', value: 'TooltipClass' },
                    { key: 'tooltip_text', value: 'TooltipText' },
                    { key: 'button_text', value: 'ButtonText' },
                    { key: 'sticky_button_text', value: 'StickyButtonText' },
                    {
                        key: 'class_upselling_tooltip',
                        value: 'TooltipClassUpselling'
                    },
                    { key: 'duo_button_text', value: 'Pasate a duo' },
                    { key: 'triple_button_text', value: 'Pasate a triple' },
                    { key: 'black_button_text', value: 'Pasate a black' }
                ]
            }
        }
    }))
}));

useSiteServices.mockImplementation(() => {
    return siteServicesMock;
});

describe('components - features - LN-10-global - header - mainHeader - helper', () => {
    describe('getTermicaValues function', () => {
        it('should never return undefined for specified property names', () => {
            const propertyNames = [
                'class_tooltip',
                'tooltip_text',
                'button_text',
                'sticky_button_text',
                'class_upselling_tooltip',
                'upselling_tooltip_text',
                'duo_button_text',
                'triple_button_text',
                'black_button_text'
            ];

            // Call the getTermicaValues function
            const termicaValues = getTermicaValues(propertyNames);

            // Iterate through the extracted values and ensure none of them are undefined
            propertyNames.map(propertyName => {
                expect(termicaValues[propertyName]).not.toBeUndefined();
            });
        });
    });

    describe('showSubscribeButton function', () => {
        global.window = {
            location: {
                origin: 'https://example.com'
            }
        };
        it('When all conditions are met return true', () => {
            useTermica.mockImplementation(() => true);
            const subscription = false;

            expect(showSubscribeButton(subscription)).toBe(true);
        });
        it('When user is subscribed return false', () => {
            useTermica.mockImplementation(() => true);
            const subscription = true;
            expect(showSubscribeButton(subscription)).toBe(false);
        });
        it('When paywall is false return false regardless of subscription value', () => {
            useTermica.mockImplementation(() => false);
            const subscription = true;
            expect(showSubscribeButton(subscription)).toBe(false);
        });
    });

    describe('getInitialState function', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        it('should return true if showTooltip is not in localStorage', () => {
            const initialState = getInitialState();
            expect(initialState).toBe(true);
        });

        it('should return the parsed value of showTooltip if it is in localStorage', () => {
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: jest.fn().mockReturnValue(JSON.stringify(false)),
                    clear: jest.fn()
                },
                writable: true
            });

            const initialState = getInitialState();
            expect(initialState).toBe(false);
        });
    });
});
