import getDataChainCollection from '../../../../components/chains/utils/getDataChainCollection';
import cajaCollection from '../../../../__mocks__/data/getDataChain/cajaCollection.json';
import { useContent } from 'fusion:content';
import articleList from '../../../../__mocks__/data/articles/articleList.json';

describe('Components - Chains - Utils - getDataChainCollection', () => {
    it('should return data of chain collection with articles', () => {
        useContent.mockImplementation(() => articleList);
        const {
            isInSiteService,
            articlesFromCollectionSiteService,
            idsArticlesToExclude,
            titleSize,
            diagramation,
            isHome
        } = getDataChainCollection(cajaCollection);
        expect(titleSize).toBeUndefined();
        expect(isInSiteService).toBeFalsy;
        expect(diagramation).toEqual('');
        expect(articlesFromCollectionSiteService.length).toEqual(0);
        expect(idsArticlesToExclude.length).toEqual(0);
        expect(isHome).toBeFalsy();
    });
    it('should return data of chain collection with articles and layout grilla1', () => {
        useContent.mockImplementation(() => articleList);
        const {
            isInSiteService,
            articlesFromCollectionSiteService,
            idsArticlesToExclude,
            titleSize,
            diagramation,
            isHome
        } = getDataChainCollection({
            ...cajaCollection,
            layout: 'grilla1'
        });
        expect(isInSiteService).toBeFalsy;
        expect(diagramation).toEqual('');
        expect(articlesFromCollectionSiteService.length).toEqual(0);
        expect(idsArticlesToExclude.length).toEqual(0);

        expect(titleSize).toEqual('--l');
        expect(isHome).toBeFalsy();
    });
    it('should return data of chain collection with articles and isHome', () => {
        useContent.mockImplementation(() => articleList);
        const {
            isInSiteService,
            articlesFromCollectionSiteService,
            idsArticlesToExclude,
            titleSize,
            diagramation,
            isHome
        } = getDataChainCollection({
            ...cajaCollection,
            pageLayout: 'LN-Home_Main'
        });
        expect(isInSiteService).toBeFalsy;
        expect(titleSize).toBeUndefined();
        expect(diagramation).toEqual('');
        expect(articlesFromCollectionSiteService.length).toEqual(0);
        expect(idsArticlesToExclude.length).toEqual(0);
        expect(isHome).toBeTruthy();
    });
    it('should return data with error of chain collection without articles', () => {
        useContent.mockImplementation(() => {});
        const {
            isInSiteService,
            articlesFromCollectionSiteService,
            idsArticlesToExclude,
            titleSize,
            diagramation,
            isHome
        } = getDataChainCollection({
            ...cajaCollection
        });
        expect(titleSize).toBeUndefined();
        expect(isInSiteService).toBeFalsy;
        expect(diagramation).toEqual('');
        expect(articlesFromCollectionSiteService.length).toEqual(0);
        expect(idsArticlesToExclude.length).toEqual(0);
        expect(isHome).toBeFalsy();
    });
});
