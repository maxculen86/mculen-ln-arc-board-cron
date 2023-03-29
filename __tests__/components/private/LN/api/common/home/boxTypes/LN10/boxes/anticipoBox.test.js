import { anticipoBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/anticipoBox';
describe('anticipoBox LN10', () => {
    it('should return the result featureInfo when featureInfo is provided', () => {
        const element = {};
        const featureInfo = {
            hideCaja: false,
            title: 'ARGENTINA CAMPEON DEL MUNDIAL',
            url: 'https://www.lanacion.com.ar',
            textBadge: 'CAMPEON',
            lead: 'Esto es una volanta.',
            video:
                '<iframe  src="https://www.youtube.com/embed/WKif1ZFFNts" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
            nameFeature: 'LN-common/LN10_anticipo',
            idRender: 'f0fD99CWu6wGp5'
        };
        const result = anticipoBox(element, featureInfo);
        expect(result).toEqual({
            hideCaja: false,
            title: 'ARGENTINA CAMPEON DEL MUNDIAL',
            url: 'https://www.lanacion.com.ar',
            textBadge: 'CAMPEON',
            lead: 'Esto es una volanta.',
            video:
                '<iframe  src="https://www.youtube.com/embed/WKif1ZFFNts" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
            nameFeature: 'LN-common/LN10_anticipo',
            idRender: 'f0fD99CWu6wGp5'
        });
    });
});
