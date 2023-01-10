import getDataChainManual from '../../../../components/chains/utils/getDataChainManual';
import article1 from '../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../__mocks__/data/articles/3THDAILWTVHARHBYA5AEVL7OAU.json';
import cajaManual from '../../../../__mocks__/data/getDataChain/cajaManual.json';
describe('Components - Chains - Utils - getDataChainManual', () => {
    const children = [];
    children.push(article1);
    children.push(article2);
    children.push(article3);
    it('should return data of chain manual', () => {
        const {
            isInApertura,
            isMultimedia,
            features,
            multimediaChildren,
            filteredChildren,
            error
        } = getDataChainManual({
            ...cajaManual,
            children,
            featureId: 'c0fDXrpc4Alq9D7'
        });

        expect(isInApertura).toBeTruthy();
        expect(isMultimedia).toBeFalsy();
        expect(features.length).toEqual(41);
        expect(multimediaChildren.length).toEqual(1);
        expect(filteredChildren.length).toEqual(0);
        expect(error).toBeNull();
    });

    it('should return data of chain manual without children', () => {
        const {
            isInApertura,
            isMultimedia,
            features,
            multimediaChildren,
            filteredChildren,
            error
        } = getDataChainManual({ ...cajaManual });

        expect(isInApertura).toBeFalsy();
        expect(isMultimedia).toBeFalsy();
        expect(features.length).toEqual(41);
        expect(multimediaChildren.length).toEqual(1);
        expect(filteredChildren.length).toEqual(0);
        expect(error).toBeNull();
    });

    it('should return error of chain manual without featureId', () => {
        const {
            isInApertura,
            isMultimedia,
            features,
            multimediaChildren,
            filteredChildren,
            error
        } = getDataChainManual({ ...cajaManual, featureId: undefined });

        expect(isInApertura).toBeFalsy();
        expect(isMultimedia).toBeFalsy();
        expect(features.length).toEqual(41);
        expect(multimediaChildren.length).toEqual(1);
        expect(filteredChildren.length).toEqual(0);
        expect(error).toBeFalsy();
    });
    it('should return error of chain manual without layout', () => {
        const {
            isInApertura,
            isMultimedia,
            features,
            multimediaChildren,
            filteredChildren,
            error
        } = getDataChainManual({ ...cajaManual, layout: undefined });

        expect(isInApertura).toBeFalsy();
        expect(isMultimedia).toBeFalsy();
        expect(features.length).toEqual(41);
        expect(multimediaChildren.length).toEqual(1);
        expect(filteredChildren.length).toEqual(0);
        expect(error).toBeTruthy();
    });
});
