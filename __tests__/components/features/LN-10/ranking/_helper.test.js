import { useContent } from 'fusion:content';
import {
    hasArticles,
    useRankingArticles
} from '../../../../../components/features/LN-10/ranking/_helper';
import {
    getRankingProps,
    getSectionParentId,
    getSectionId,
    getRankingType
} from '../../../../../components/features/LN-10/ranking/common/_helper-WebApi.js';
import articlesMock from '../../../../../__mocks__/data/articlesAcum/articles.json';

const mockedGetSectionName = jest.fn();

jest.doMock(
    '../../../../../components/private/LN/common/utils/getSectionName',
    () => mockedGetSectionName
);

describe('features - LN10 - Ranking - common - HelperWebApi - getRankingProps', () => {
    test('returns object with specific keys', () => {
        const mockParams = {
            layout: 'LN10-Home_Main',
            featureId: 'rankingHome',
            globalContent: {}
        };

        const rankingProps = getRankingProps(...Object.values(mockParams));

        expect(Object.keys(rankingProps)).toEqual([
            'title',
            'sectionName',
            'sectionId',
            'isHome',
            'notesQuantity',
            'classCondition',
            'rankingLayout'
        ]);
    });

    test('returns isHome key according layout param', () => {
        const mockParams = { layout: 'LN10-Home_Main' };

        const { isHome } = getRankingProps(...Object.values(mockParams));
        const { isHome: isNotHome } = getRankingProps(
            ...Object.values({ ...mockParams, layout: '' })
        );

        expect(isHome).toBeTruthy();
        expect(isNotHome).toBeFalsy();
    });

    test('returns isInverse key according featureId param', () => {
        const mockParams = {
            layout: 'LN10-Home_Main',
            featureId: 'inverse-home'
        };

        const { isInverse } = getRankingProps(...Object.values(mockParams));
        const { isInverse: isNotInverse } = getRankingProps(
            ...Object.values({ ...mockParams, featureId: 'rankingHome' })
        );

        expect(isInverse).toBeTruthy();
        expect(isNotInverse).toBeFalsy();
    });

    test('returns rankingType home when acuTag is false', () => {
        const mockParams = {
            layout: '',
            featureId: ''
        };

        const rankingProps = getRankingProps(...Object.values(mockParams));

        expect(Object.keys(rankingProps)).toEqual([
            'sectionName',
            'sectionId',
            'isHome',
            'notesQuantity',
            'classCondition'
        ]);
    });
});

describe('features - LN10 - Ranking - common - HelperWebApi - getSectionParentId', () => {
    test('returns empty string when sectionId is falsy', () => {
        const sectionParentId = getSectionParentId('');
        expect(sectionParentId).toEqual('');
    });

    test('returns section name without slash', () => {
        const sectionParentId = getSectionParentId('economia/');
        expect(sectionParentId).toEqual('economia');
    });

    test('returns first section name without slash', () => {
        const sectionParentId = getSectionParentId('economia/campo');
        expect(sectionParentId).toEqual('economia');
    });
});

describe('features - LN10 - Ranking - common - HelperWebApi - getSectionId', () => {
    mockedGetSectionName.mockRestore();

    test('returns empty string without params', () => {
        const sectionId = getSectionId();
        expect(sectionId).toEqual('');
    });

    test('returns empty string when node_type is home', () => {
        const sectionId = getSectionId({
            node_type: 'home'
        });

        expect(sectionId).toEqual('');
    });

    test('returns sectionId when type is story', () => {
        const sectionId = getSectionId({
            node_type: 'nota',
            type: 'story',
            taxonomy: {
                primary_section: {
                    _id: 'economia/campo'
                }
            }
        });

        expect(sectionId).toEqual('campo');
    });

    test('returns sectionId when type is acumulado', () => {
        const sectionId = getSectionId({
            node_type: 'section',
            type: 'acumulado',
            _id: 'economia/campo'
        });

        expect(sectionId).toEqual('campo');
    });
});

describe('features - LN10 - Ranking - common - HelperWebApi - getRankingType', () => {
    test('returns section name by default', () => {
        const SECTION_NAME = 'home';
        mockedGetSectionName.mockReturnValue(SECTION_NAME);

        const rankingType = getRankingType();
        expect(rankingType).toEqual(SECTION_NAME);
    });

    test('returns home when the layout is acumulado and node type is not section', () => {
        mockedGetSectionName.mockReturnValue('acumulado');

        const rankingType = getRankingType({ node_type: 'tags' });
        expect(rankingType).toEqual('home');
    });
});

describe('features - LN10 - Ranking - Helper - hasArticles', () => {
    test('returns articles length', () => {
        const itHasArticles = hasArticles({ articles: articlesMock });
        expect(itHasArticles).toBe(!!articlesMock.length);
    });

    test('returns false by default', () => {
        const itHasArticles = hasArticles();
        expect(itHasArticles).toBeFalsy();
    });
});

describe('features - LN10 - Ranking - Helper - useRankingArticles', () => {
    test('returns data when sectionId or sectionParentId is falsy', () => {
        const dataMock = {
            _id: '3f14b384049f464ae3345baa3c1d3a81ed785422f1d3388b7d58d39f9525f5fa',
            articles: articlesMock.slice(0, 5),
            name: '',
            size: 5
        };

        useContent.mockImplementation(() => dataMock);
        const dataContent = useRankingArticles(
            '',
            'la-nacion-ar',
            'LN10-Home_Main',
            'rankingArticlesSource'
        );

        expect(dataContent).toEqual(dataMock);
    });

    test('returns empty object when data is falsy', () => {
        useContent.mockImplementation(() => null);
        const dataContent = useRankingArticles(
            '',
            'la-nacion-ar',
            'LN10-Home_Main',
            'rankingArticlesSource'
        );

        expect(dataContent).toEqual({});
    });

    test('returns data when sectionId and sectionParentId is truthy and has any article', () => {
        const dataMock = {
            _id: '3f14b384049f464ae3345baa3c1d3a81ed785422f1d3388b7d58d39f9525f5fa',
            articles: articlesMock.slice(0, 5),
            name: '',
            size: 5
        };

        useContent.mockImplementation(() => dataMock);
        const dataContent = useRankingArticles(
            'economia/campo/',
            'la-nacion-ar',
            'LN10-Home_Main',
            'rankingArticlesSource'
        );

        expect(dataContent).toEqual(dataMock);
    });
});
