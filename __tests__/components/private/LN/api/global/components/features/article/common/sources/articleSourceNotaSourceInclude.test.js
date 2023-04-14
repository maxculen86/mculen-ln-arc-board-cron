import { articleSourceNotaSourceInclude } from '../../../../../../../../../../../components/private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import fieldsToArticles from '../../../../../../../../../../../components/private/LN/api/global/components/features/article/configs/jsons/configIncludeFieldsByTypeChainOrArticle.json';

describe('articleSourceNotaSourceInclude', () => {
    it('returns the default fields for an undefined typeChain', () => {
        const result = articleSourceNotaSourceInclude(undefined);
        expect(result).toEqual(fieldsToArticles.default);
    });

    it('returns the fields for the "liveblog" typeChain', () => {
        const result = articleSourceNotaSourceInclude('liveblog');
        expect(result).toEqual(fieldsToArticles.liveblog);
    });

    it('returns undefined for an unknown typeChain', () => {
        const result = articleSourceNotaSourceInclude('');
        expect(result).toEqual(fieldsToArticles.default);
    });
});
