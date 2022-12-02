import setArticleClassName from '../../../../../components/private/common/utils/setArticleClassName';

describe('components - private - common - utils - setArticleClassName', () => {
    const mocks = {
        default: {
            boxPosition: 'toi202',
            withMedia: true,
            _id: 'SUW6AQPARNCGLBDM2YOUGGC474'
        },
        noMedia: {
            boxPosition: 'toi202',
            withMedia: false,
            _id: 'SUW6AQPARNCGLBDM2YOUGGC474'
        },
        author: {
            boxPosition: 'toi202',
            isRenderAuthorOpinion: true,
            withMedia: true,
            _id: 'SUW6AQPARNCGLBDM2YOUGGC474'
        },
        classCondition: {
            boxPosition: 'toi202',
            classCondition: '--some-class',
            withMedia: true,
            _id: 'SUW6AQPARNCGLBDM2YOUGGC474'
        }
    };

    const classBase = 'mod-article';

    it('should be mod-article with toiclass and nid', () => {
        expect(setArticleClassName(mocks.default)).toBe(classBase);
    });

    it('should include --no-media class', () => {
        expect(setArticleClassName(mocks.noMedia)).toBe(
            `${classBase} --no-media`
        );
    });

    it('should include --author class', () => {
        expect(setArticleClassName(mocks.author)).toBe(`${classBase} --author`);
    });

    it('should include --some-class (classCondition)', () => {
        expect(setArticleClassName(mocks.classCondition)).toBe(
            `${classBase} --some-class`
        );
    });
});
