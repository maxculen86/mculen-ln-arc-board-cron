import React from 'react';
import {
    getLayoutType,
    getPlaceholder,
    placeholderLayouts
} from '../../../../../../components/private/LN/common/utils/cajaTemasPlaceholder';

describe('Util cajaTemasPlaceholder', () => {
    describe('function getLayoutType', () => {
        it('should be defined as a function', () => {
            expect(getLayoutType).toBeDefined();
            expect(typeof getLayoutType).toBe('function');
        });
        it('should return "Bomba" when layout is bomba1', () => {
            expect(getLayoutType('bomba1')).toBe('Bomba');
        });
        it('should return "Focal" when layouts are focalLeft3 and focalRight2', () => {
            expect(getLayoutType('focalLeft3')).toBe('Focal');
            expect(getLayoutType('focalRight2')).toBe('Focal');
        });
        it('should return "Color" when layouts are notaColorVerde and notaColorRosa', () => {
            expect(getLayoutType('notaColorVerde')).toBe('Color');
            expect(getLayoutType('notaColorRosa')).toBe('Color');
        });
        it('should return "Grilla" when layouts are grilla1, grilla2, grilla3, grilla6, grilla9', () => {
            expect(getLayoutType('grilla1')).toBe('Grilla');
            expect(getLayoutType('grilla2')).toBe('Grilla');
            expect(getLayoutType('grilla3')).toBe('Grilla');
            expect(getLayoutType('grilla6')).toBe('Grilla');
            expect(getLayoutType('grilla9')).toBe('Grilla');
        });
        it('should return "Author" when layout is author3', () => {
            expect(getLayoutType('author3')).toBe('Author');
        });
        it('should return "Opinion" when layout is opinion4', () => {
            expect(getLayoutType('opinion4')).toBe('Opinion');
        });
        it('should return "Editoriales" when layout is editoriales2', () => {
            expect(getLayoutType('editoriales2')).toBe('Editoriales');
        });
        it('should return "" when unknown layouts', () => {
            expect(getLayoutType('layoutX')).toBe('');
        });
    });
    describe('function getPlaceholder', () => {
        it('should be defined as a function', () => {
            expect(getPlaceholder).toBeDefined();
            expect(typeof getPlaceholder).toBe('function');
        });
        describe('by layout', () => {
            //used for LN Caja Collection
            describe('Focal', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Focal');
                const phFocalRight = getPlaceholder('focalRight2');
                const phFocalLeft = getPlaceholder('focalLeft3');
                it('should call function "Focal"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(2);
                });
                it('snapshot focalRight2', () => {
                    expect(phFocalRight).toMatchSnapshot();
                });
                it('snapshot focalLeft3', () => {
                    expect(phFocalLeft).toMatchSnapshot();
                });
            });
            describe('Color', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Color');
                const phColorVerde = getPlaceholder('notaColorVerde3');
                const phColorRosa = getPlaceholder('notaColorRosa3');
                it('should call function "Color"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(2);
                });
                it('snapshot notaColorVerde3', () => {
                    expect(phColorVerde).toMatchSnapshot();
                });
                it('snapshot notaColorRosa3', () => {
                    expect(phColorRosa).toMatchSnapshot();
                });
            });
            describe('Grilla', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Grilla');
                const phGrilla1 = getPlaceholder('grilla1');
                const phGrilla2 = getPlaceholder('grilla2');
                const phGrilla3 = getPlaceholder('grilla3');
                const phGrilla6 = getPlaceholder('grilla6');
                const phGrilla9 = getPlaceholder('grilla9');
                it('should call function "Grilla"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(5);
                });
                it('snapshot grilla1', () => {
                    expect(phGrilla1).toMatchSnapshot();
                });
                it('snapshot grilla2', () => {
                    expect(phGrilla2).toMatchSnapshot();
                });
                it('snapshot grilla3', () => {
                    expect(phGrilla3).toMatchSnapshot();
                });
                it('snapshot grilla6', () => {
                    expect(phGrilla6).toMatchSnapshot();
                });
                it('snapshot grilla9', () => {
                    expect(phGrilla9).toMatchSnapshot();
                });
            });
            describe('Author', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Author');
                const phAuthor = getPlaceholder('author3');
                it('should call function "Author"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(1);
                });
                it('snapshot author3', () => {
                    expect(phAuthor).toMatchSnapshot();
                });
            });
            describe('Opinion', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Opinion');
                const phOpinion = getPlaceholder('opinion4');
                it('should call function "Opinion"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(1);
                });
                it('snapshot opinion4', () => {
                    expect(phOpinion).toMatchSnapshot();
                });
            });
            describe('Editoriales', () => {
                const spy = jest.spyOn(placeholderLayouts, 'Editoriales');
                const phEditoriales = getPlaceholder('editoriales2');
                it('should call function "Editoriales"', () => {
                    expect(spy).toHaveBeenCalled();
                    expect(spy).toBeCalledTimes(1);
                });
                it('snapshot editoriales2', () => {
                    expect(phEditoriales).toMatchSnapshot();
                });
            });
            describe('Unknown', () => {
                const phUnknown = getPlaceholder('layoutX');
                it('snapshot layoutX', () => {
                    expect(phUnknown).toMatchSnapshot();
                });
            });
        });
        describe('by layout and index position', () => {
            //used for LN Articulo (LN Bomba return => LN Articulo)
            describe('when layout is bomba1', () => {
                const phBomba = getPlaceholder('bomba1', 0);
                it('should return bomba index 0', () => {
                    expect(phBomba).toMatchSnapshot();
                });
            });
        });
    });
});
