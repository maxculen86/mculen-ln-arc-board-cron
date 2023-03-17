import Metadata from '../../../../../../../../../components/private/LN/api/common/elements/story/metadata';
import articlewithMetadata from '../../../../../../../../../__mocks__/data/articles/K2MUVLCAV5H2JCQCSHWGZV6M64.json';
import articlewithOutMetadata from '../../../../../../../../../__mocks__/data/articles/RBBFXJVY7JEZBC7PDXQSV3ZQFU.json';

describe('Test de index en Json', () => {
    test('Test article with Metadata', () => {
        var resp = Metadata(articlewithMetadata);
        expect(resp).toMatchObject({ eje_subeje: 'Breaking News' });
    });

    test('Test article Not Metadata', () => {
        var resp = Metadata(articlewithOutMetadata);
        expect(resp).toBeNull();
    });
});
