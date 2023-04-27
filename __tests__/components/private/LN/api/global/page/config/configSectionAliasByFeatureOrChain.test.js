import configSectionAliasByFeatureOrChain from '../../../../../../../../components/private/LN/api/global/page/config/configSectionAliasByFeatureOrChain';
describe('configSectionAliasByFeatureOrChain', () => {
    it('returns the correct section aliases for feature or chain', () => {
        expect(configSectionAliasByFeatureOrChain.apertura).toEqual([
            'Apertura_1',
            'Apertura_2'
        ]);
        expect(configSectionAliasByFeatureOrChain.multimedia).toEqual([
            'Multimedia'
        ]);
        expect(configSectionAliasByFeatureOrChain.comercial).toEqual([
            'Comercial_1',
            'Comercial_2'
        ]);
    });
});
