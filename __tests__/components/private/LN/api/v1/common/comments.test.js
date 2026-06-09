import {
    displayComments,
    getArticleComments,
    openComments
} from '../../../../../../../components/private/LN/api/common/elements/story/comments';
import articleCommentsOpen from '../../../../../../../__mocks__/data/articles/JMQ44OZHHBC5ZJ5TXTSIIPZMTI.json';
import articleCommentsClosedByDeadline from '../../../../../../../__mocks__/data/articles/FUO2YR3EABBAFOMSI2BBS6J7FM.json';

const navigationTreeLivefyreOn = {
    Termicas: { livefyre: 'true' },
    migration: { deadline_livefyre: '2020-02-07' }
};

describe('story comments helpers', () => {
    describe('displayComments', () => {
        it('returns true when livefyre and display_comments are enabled', () => {
            expect(
                displayComments({
                    comments: { display_comments: true },
                    navigationTreeSource: navigationTreeLivefyreOn
                })
            ).toBe(true);
        });

        it('returns false when livefyre is disabled', () => {
            expect(
                displayComments({
                    comments: { display_comments: true },
                    navigationTreeSource: {
                        Termicas: { livefyre: 'false' }
                    }
                })
            ).toBe(false);
        });

        it('returns false when display_comments is false', () => {
            expect(
                displayComments({
                    comments: { display_comments: false },
                    navigationTreeSource: navigationTreeLivefyreOn
                })
            ).toBe(false);
        });
    });

    describe('getArticleComments', () => {
        it('returns comments shape from a merged dataNota', () => {
            expect(getArticleComments(articleCommentsOpen)).toEqual({
                abiertoComentarios: true,
                permitirComentarios: true
            });
        });

        it('returns closed comments when article predates deadline', () => {
            expect(getArticleComments(articleCommentsClosedByDeadline)).toEqual(
                {
                    abiertoComentarios: false,
                    permitirComentarios: true
                }
            );
        });
    });

    describe('openComments', () => {
        it('returns true when article is published on or after deadline_livefyre', () => {
            expect(openComments(articleCommentsOpen)).toBe(true);
        });

        it('returns false when article predates deadline_livefyre', () => {
            expect(openComments(articleCommentsClosedByDeadline)).toBe(false);
        });

        it('returns false when display_comments is false', () => {
            expect(
                openComments({
                    ...articleCommentsOpen,
                    comments: {
                        allow_comments: true,
                        display_comments: false
                    }
                })
            ).toBe(false);
        });

        it('returns false when livefyre is disabled', () => {
            expect(
                openComments({
                    ...articleCommentsOpen,
                    navigationTreeSource: {
                        Termicas: { livefyre: 'false' },
                        migration: { deadline_livefyre: '2020-02-07' }
                    }
                })
            ).toBe(false);
        });

        it('returns falsy when first_publish_date is missing', () => {
            const { first_publish_date, ...articleWithoutDate } =
                articleCommentsOpen;

            expect(openComments(articleWithoutDate)).toBeFalsy();
        });
    });
});
