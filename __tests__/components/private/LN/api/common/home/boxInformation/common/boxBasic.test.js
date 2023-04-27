import boxInfoBasic from '../../../../../../../../../components/private/LN/api/common/home/boxInformation/common/boxBasic';
describe('boxInfoBasic', () => {
    const information = { layout: 'full' };
    const section = 'SectionAlias';
    const typeSection = {
        sectionalias: {
            name: 'SectionAlias',
            type: 'default'
        },
        default: {
            name: 'DefaultSection',
            type: 'default'
        }
    };

    it('returns box info with section type', () => {
        const result = boxInfoBasic(information, section, typeSection);
        expect(result.name).toEqual('SectionAlias');
        expect(result.type).toEqual('default');
        expect(result.diagramacion).toEqual('full');
    });

    it('returns box info with default section type', () => {
        const result = boxInfoBasic(information, 'AnotherSection', typeSection);
        expect(result.name).toEqual('DefaultSection');
        expect(result.type).toEqual('default');
        expect(result.diagramacion).toEqual('full');
    });

    it('returns null when information is falsy', () => {
        const result = boxInfoBasic(null, section, typeSection);
        expect(result).toBeNull();
    });
});
