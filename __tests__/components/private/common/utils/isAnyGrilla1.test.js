import isAnyGrilla1 from '../../../../../components/private/common/utils/isAnyGrilla1';

const renderables = [
    {
        collection: 'chains',
        type: 'Ln_Caja_Collection',
        props: {
            collection: 'chains',
            type: 'Ln_Caja_Collection',
            id: 'c0fwcVsyeE619LE',
            name: null,
            customFields: {
                hideTitle: false,
                initialPosition: 1,
                layout: 'grilla1',
                idCollection: 'W357TXLF3JFJ5MKKTLMCFK56TA',
                title: 'Horóscopo de hoy por signo',
                url: ''
            },
            displayProperties: {}
        },
        children: []
    },
    {
        collection: 'chains',
        type: 'Ln_Caja_Collection',
        props: {
            collection: 'chains',
            type: 'Ln_Caja_Collection',
            id: 'c0fBwvPKfcc692Q',
            name: null,
            customFields: {
                hideTitle: true,
                initialPosition: 7,
                layout: 'grilla6',
                idCollection: 'W357TXLF3JFJ5MKKTLMCFK56TA',
                hideCaja: false
            },
            displayProperties: {}
        },
        children: []
    }
];
describe('Component - common- utils - isANyGrilla1 Test', () => {
    it('Should return true if has a renderable with grilla1 diagramation', () => {
        expect(isAnyGrilla1(renderables)).toBe(true);
    });
    it('Should return false with an empty array', () => {
        expect(isAnyGrilla1([])).toBe(false);
    });
    it('Should be falsy if no element has grilla1 diagramation', () => {
        expect(
            isAnyGrilla1([
                {
                    collection: 'chains',
                    type: 'Ln_Caja_Collection',
                    props: {
                        collection: 'chains',
                        type: 'Ln_Caja_Collection',
                        id: 'c0fBwvPKfcc692Q',
                        name: null,
                        customFields: {
                            hideTitle: true,
                            initialPosition: 7,
                            layout: 'grilla6',
                            idCollection: 'W357TXLF3JFJ5MKKTLMCFK56TA',
                            hideCaja: false
                        },
                        displayProperties: {}
                    },
                    children: []
                }
            ])
        ).toBe(false);
    });
});
