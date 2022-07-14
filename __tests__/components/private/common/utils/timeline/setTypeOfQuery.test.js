import { setTypeOfQuery } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTypeOfQuery', () => {
    it('returns null if tlFeatureId is undefined', () => {
        const props = {
            source: 'byLastNews',
            sectionsIds: '("/deportes","/economia")'
        };

        const result = setTypeOfQuery(props);
        console.log(result);
    });
});
