import {
    isElementInPosition,
    validateChainFoodit,
    getIdCollection
} from '../../../../../components/chains/foodit_Caja_Collection/common/_helper';
import mockLayoutSections from '../../../../../__mocks__/data/foodit/objectTree';

describe('Tests - helpers - fooditCajaCollection', () => {
    describe('Tests function validateChainFoodit', () => {
        const mockedProps = {
            minArticles: 4,
            idCollection: 'mockedId',
            articles: ['article1', 'article2', 'article3', 'article4'],
            layout: 'carousel'
        };
        test('should return warnning when the layout is not defined', () => {
            expect(
                validateChainFoodit({
                    ...mockedProps,
                    layout: undefined
                })
            ).toEqual({
                message: 'Se requiere que seleccione una diagramación',
                type: 'warning'
            });
        });

        test('should return warnning when the idCollection is not defined', () => {
            expect(
                validateChainFoodit({
                    ...mockedProps,
                    idCollection: undefined
                })
            ).toEqual({
                message: 'Se requiere el id de la colección',
                type: 'warning'
            });
        });

        test('should return warnning when the articles is not defined', () => {
            expect(
                validateChainFoodit({
                    ...mockedProps,
                    articles: undefined
                })
            ).toEqual({
                message: 'La colección mockedId no encontró notas',
                type: 'warning'
            });
        });

        test('should return warnning when the articles quantity is 0', () => {
            expect(
                validateChainFoodit({
                    ...mockedProps,
                    articles: []
                })
            ).toEqual({
                message: 'La colección mockedId no encontró notas',
                type: 'warning'
            });
        });

        test('should return a warning when the quantity of items does not respect the minimum allowed', () => {
            expect(
                validateChainFoodit({
                    ...mockedProps,
                    minArticles: 5
                })
            ).toEqual({
                message: 'Se requieren un minimo de 5 articulos',
                type: 'warning'
            });
        });
    });

    describe('Tests function isElementInFirstPosition', () => {
        test('should return true when the element of the block is the one sought', () => {
            expect(
                isElementInPosition({
                    positionElement: 0,
                    positionBlock: 1,
                    id: 'mocked-id-firts-carusel',
                    tree: mockLayoutSections
                })
            ).toBeTruthy();
        });

        test('should return false when the element of the block is not the one sought.', () => {
            expect(
                isElementInPosition({
                    positionElement: 0,
                    positionBlock: 1,
                    id: 'mocked-id-manual-box',
                    tree: mockLayoutSections
                })
            ).toBeFalsy();
        });

        test('should return false when the object tree is not defined', () => {
            expect(
                isElementInPosition({
                    positionElement: 0,
                    positionBlock: 1,
                    id: 'mocked-id-manual-box'
                })
            ).toBeFalsy();
        });

        test('should return false when the id is not defined', () => {
            expect(
                isElementInPosition({
                    positionElement: 0,
                    positionBlock: 1,
                    tree: mockLayoutSections
                })
            ).toBeFalsy();
        });

        test('should return true when the first element to be searched does not exist in the first block. (By default, it finds the first element of the first block if positions are not specified.)', () => {
            expect(
                isElementInPosition({
                    id: 'mocked-id-firts-carusel',
                    tree: mockLayoutSections
                })
            ).toBeFalsy();
        });

        test('should return false when the properties is not defined or null', () => {
            expect(isElementInPosition()).toBeFalsy();
            expect(isElementInPosition(null)).toBeFalsy();
        });
    });

    describe('tests function getIdCollection', () => {
        const mockedProps = {
            isStatic: false,
            inViewport: false,
            idCollection: 'mocked-id-colleciton',
            isAdmin: false,
            isWithOutLazyLoad: false
        };
        test('should return null when the parameters is not defined', () => {
            expect(getIdCollection()).toBeNull();
        });

        test('should return null when the idCollection is not valid', () => {
            expect(
                getIdCollection({ ...mockedProps, idCollection: ' ' })
            ).toBeNull();
        });

        test('should return null when the collection box is lazy and is not in viewport', () => {
            expect(getIdCollection(mockedProps)).toBeNull();
        });

        test('should return collection id when the collection id is valid and is render without lazy', () => {
            expect(
                getIdCollection({
                    ...mockedProps,
                    isStatic: true,
                    isWithOutLazyLoad: true
                })
            ).toEqual('mocked-id-colleciton');
        });

        test('should return collection id when the collection id is valid and collection box is in the viewport', () => {
            expect(
                getIdCollection({
                    ...mockedProps,
                    inViewport: true
                })
            ).toEqual('mocked-id-colleciton');
        });

        test('should return collection id when the collection id is valid and isAdmin is true', () => {
            expect(
                getIdCollection({
                    ...mockedProps,
                    isAdmin: true
                })
            ).toEqual('mocked-id-colleciton');
        });
    });
});
