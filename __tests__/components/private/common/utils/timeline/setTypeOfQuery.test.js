import { setTypeOfQuery } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTypeOfQuery', () => {
    it('works with source byLastNews', () => {
        const props = {
            source: 'byLastNews',
            sectionsIds: '("/deportes","/economia")'
        };

        const result = setTypeOfQuery(props);

        expect(result.hasOwnProperty('sectionsIds')).toBeTruthy();
        expect(result.sectionsIds).toEqual('("/deportes","/economia")');
    });

    it('returns undefined on sectionsIds if not exists', () => {
        const props = {
            source: 'byLastNews'
        };

        const result = setTypeOfQuery(props);

        expect(result.hasOwnProperty('sectionsIds')).toBeTruthy();
        expect(result.sectionsIds).toEqual(undefined);
    });

    it('works with source byTagSection selecting tag', () => {
        const props = {
            source: 'byTagSection',
            sectionTagType: 'tag',
            sectionTagValue: 'hoy'
        };

        const result = setTypeOfQuery(props);

        expect(result.hasOwnProperty('tagId')).toBeTruthy();
        expect(result.tagId).toEqual(props.sectionTagValue);
    });

    it('works with source byTagSection selecting section', () => {
        const props = {
            source: 'byTagSection',
            sectionTagType: 'section',
            sectionTagValue: '/economia'
        };

        const result = setTypeOfQuery(props);

        expect(result.hasOwnProperty('sectionId')).toBeTruthy();
        expect(result.sectionId).toEqual(props.sectionTagValue);
    });
});
