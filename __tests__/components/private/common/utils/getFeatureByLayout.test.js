import getFeatureByLayout from '../../../../../components/private/LN/common/utils/getFeatureByLayout';

describe('Private - Common - Utils - getFeatureByLayout', () => {
    const globalMock = {
        features: [
            {
                type: 'LN-common/cajaAnticipo',
                props: { id: 'f0fDTh11879y5mD' }
            },
            { type: 'LN-common/anexo', props: { id: 'f0f3KYV3ghQE84H' } },
            { type: 'LN-common/bomba', props: { id: 'f0fzcWuA9xGx9lQ' } },
            { type: 'LN-common/articulo', props: { id: 'f0fqeeJJ0koVb48' } },
            { type: 'LN-common/articulo', props: { id: 'f0fxrri2oajr2t8' } },
            { type: 'LN-common/articulo', props: { id: 'f0ffVFVSyqIJ2ja' } },
            { type: 'LN-common/articulo', props: { id: 'f0ftyFxi6QVr2la' } },
            { type: 'LN-acumulado/timeline', props: { id: 'f0fjM9doXQoV5c8' } },
            { type: 'LN-common/articulo', props: { id: 'f0fycrC1KMFmbph' } },
            { type: 'LN-common/articulo', props: { id: 'f0fQ7kthe0gX3Qq' } }
        ],
        children: [
            { key: 'f0fKNiPSPWOa8fK' },
            { key: 'f0fbLKekQWOa87j' },
            { key: 'f0f3dZ8rQWOa8PV' },
            { key: 'f0fjuAqyQWOa87j' },
            { key: 'f0fjM9doXQoV5c8' }
        ],
        layoutName: 'Timeline'
    };

    it('works in regular case', () => {
        const timeline = globalMock.features.find(
            feature => feature.type === 'LN-acumulado/timeline'
        );
        const result = getFeatureByLayout(...Object.values(globalMock));

        expect(result).toEqual(timeline);
    });

    it('returns null if not finds the feature', () => {
        const props = { ...globalMock, layoutName: 'Grilla 1' };
        const result = getFeatureByLayout(...Object.values(props));

        expect(result).toBeNull();
    });

    it('return null if there are no features', () => {
        const props = { ...globalMock, features: undefined };
        const result = getFeatureByLayout(...Object.values(props));

        expect(result).toBeNull();
    });
});
