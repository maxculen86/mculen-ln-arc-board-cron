import addEventToDataLayer from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

describe('Function addEventToDataLayer', () => {
    const input = {
        category: 'Header',
        action: 'home_ln10',
        label: 'Economia',
        event: 'e_linkclick'
    };

    test('should register in dataLayer the event with the specified values', () => {
        delete window.dataLayer;
        global.window.dataLayer = [];

        addEventToDataLayer(input);

        expect(window.dataLayer).toStrictEqual([
            {
                dynamic_action: 'home_ln10',
                dynamic_category: 'Header',
                dynamic_label: 'Economia',
                event: 'e_linkclick'
            }
        ]);
    });

    test('should return an empty object when the input is undefined', () => {
        delete window.dataLayer;
        global.window.dataLayer = [];

        addEventToDataLayer(undefined);

        expect(window.dataLayer).toStrictEqual([{}]);
    });
});
