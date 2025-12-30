import { processLayoutItems } from '../../../../components/chains/utils/processLayoutItems';
import { LAYOUTS } from '../../../../components/chains/utils/common/_helpers-WebApi';

const { FOCAL_LEFT, FOCAL_LEFT_VIDEO, FOCAL_CENTER, BN_6_GRID_MAS_TIMELINE } =
    LAYOUTS;

describe('processLayoutItems', () => {
    const createItem = (type, id) => ({
        nodo: { key: id },
        type,
        id
    });

    const timeline = createItem('LN-10/timeline', 'timeline1');
    const video = createItem('LN-10/videoPlayer', 'video1');
    const article1 = createItem('LN-10/article', 'article1');
    const article2 = createItem('LN-10/article', 'article2');
    const article3 = createItem('LN-10/article', 'article3');
    const article4 = createItem('LN-10/article', 'article4');
    const article5 = createItem('LN-10/article', 'article5');
    const article6 = createItem('LN-10/article', 'article6');

    const setupArgs = items => {
        const nodes = items.map(i => i.nodo);
        const props = items.map(i => ({ type: i.type, id: i.id }));
        return { nodes, props };
    };

    describe('FOCAL_LEFT (Timeline Priority)', () => {
        it('should append timeline at the end and slice regulars to 5', () => {
            const items = [
                article1,
                timeline,
                article2,
                article3,
                article4,
                article5,
                article6
            ];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(nodes, props, FOCAL_LEFT, true);

            expect(result).toHaveLength(6);
            expect(result[5]).toBe(timeline.nodo);
            expect(result[0]).toBe(article1.nodo);
            expect(result.slice(0, 5)).not.toContain(timeline.nodo);
        });

        it('should exclude video from regularItems even if timeline is special', () => {
            const items = [
                article1,
                timeline,
                video,
                article2,
                article3,
                article4,
                article5
            ];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(nodes, props, FOCAL_LEFT, true);

            expect(result).not.toContain(video.nodo);
            expect(result).toContain(timeline.nodo);
        });
    });

    describe('FOCAL_LEFT_VIDEO (Video Priority)', () => {
        it('should append video at the end', () => {
            const items = [
                article1,
                video,
                article2,
                article3,
                article4,
                article5
            ];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(nodes, props, FOCAL_LEFT_VIDEO);

            expect(result).toHaveLength(6);
            expect(result[5]).toBe(video.nodo);
        });

        it('should fallback to timeline if no video', () => {
            const items = [
                article1,
                timeline,
                article2,
                article3,
                article4,
                article5
            ];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(
                nodes,
                props,
                FOCAL_LEFT_VIDEO,
                true
            );

            expect(result[5]).toBe(timeline.nodo);
        });
    });

    describe('BN_PLAYER Layouts (Video Priority)', () => {
        it('should unshift video to index 0', () => {
            const items = [article1, video, article2, article3];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(
                nodes,
                props,
                LAYOUTS.BN_PLAYER_1_MAS_3
            );

            expect(result).toHaveLength(4);
            expect(result[0]).toBe(video.nodo);
            expect(result[1]).toBe(article1.nodo);
        });
    });

    describe('BN_6_GRID_MAS_TIMELINE', () => {
        it('should append timeline at the end and slice regulars to 6', () => {
            const items = [
                article1,
                article2,
                article3,
                article4,
                article5,
                article6,
                timeline,
                createItem('LN-10/article', 'article7')
            ];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(
                nodes,
                props,
                BN_6_GRID_MAS_TIMELINE,
                true
            );

            expect(result).toHaveLength(7);
            expect(result[6]).toBe(timeline.nodo);
            expect(result[0]).toBe(article1.nodo);
        });
    });

    describe('Other Layouts', () => {
        it('should return all items as regular (sliced by default quantity)', () => {
            const items = [article1, timeline, article2, article3, article4];
            const { nodes, props } = setupArgs(items);
            const result = processLayoutItems(nodes, props, FOCAL_CENTER);

            expect(result).toHaveLength(4);
            expect(result).toContain(timeline.nodo);
        });
    });

    describe('Edge Cases', () => {
        it('should extract special item from deep in a large list', () => {
            const manyArticles = Array.from({ length: 20 }, (_, i) =>
                createItem('LN-10/article', `article_${i}`)
            );
            const itemsWithDeepTimeline = [
                ...manyArticles.slice(0, 15),
                timeline,
                ...manyArticles.slice(15)
            ];

            const { nodes, props } = setupArgs(itemsWithDeepTimeline);
            const result = processLayoutItems(nodes, props, FOCAL_LEFT, true);

            expect(result).toHaveLength(6);
            expect(result[5]).toBe(timeline.nodo);
            expect(result[0]).toEqual(manyArticles[0].nodo);
        });
    });
});
