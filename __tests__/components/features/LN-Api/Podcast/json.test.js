import Podcast from '../../../../../components/features/LN-Api/Podcast/json';

jest.mock('fusion:consumer', () => {
    return function (component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent() {}
        };
    };
});

const propsComponent = ({
    globalContent,
    globalContentConfig,
    arcSite = 'la-nacion-ar'
}) => ({
    arcSite,
    globalContent,
    globalContentConfig
});

describe('components - features - LN-Api - Podcast - json.js', () => {
    const mockEpisodes = Array.from({ length: 50 }, (_, i) => ({
        id: `ep-${i}`,
        title: `Episode ${i}`
    }));

    const props = propsComponent({
        globalContent: mockEpisodes,
        globalContentConfig: {
            source: 'podcastSource',
            query: {
                uri: 'size:10 page:2',
                website: 'la-nacion-ar',
                'arc-site': 'la-nacion-ar'
            }
        }
    });

    it('When Podcast loads props OK', () => {
        const objPodcast = new Podcast(props);

        expect(objPodcast.props).toMatchObject(props);
        expect(objPodcast.state).toEqual({});

        const response = objPodcast.render();

        expect(response.currentPage).toBe(2);
        expect(response.episodesPerPage).toBe(10);
        expect(response.totalEpisodes).toBe(50);
        expect(response.totalPages).toBe(5);
        expect(response.nextPage).toBe(3);

        expect(response.episodes).toHaveLength(10);
        expect(response.episodes[0].id).toBe('ep-10');
        expect(response.episodes[9].id).toBe('ep-19');
    });

    it('When globalContent is null', () => {
        const objPodcast = new Podcast({
            ...props,
            globalContent: null
        });

        const result = objPodcast.render();

        expect(result.success).toBeFalsy();
        expect(result.message).toBe('globalContent is null or undefined');
    });

    it('Page too large returns empty list but valid structure', () => {
        const objPodcast = new Podcast(
            propsComponent({
                globalContent: mockEpisodes,
                globalContentConfig: {
                    query: { uri: 'size:20 page:999' }
                }
            })
        );

        const result = objPodcast.render();

        expect(result.episodes).toEqual([]);
        expect(result.currentPage).toBe(999);
    });

    it('Invalid page (<1) returns error object', () => {
        const objPodcast = new Podcast(
            propsComponent({
                globalContent: mockEpisodes,
                globalContentConfig: { query: { uri: 'page:0' } }
            })
        );

        const result = objPodcast.render();

        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/>= 1/);
    });

    it('should expose the same keys always (ArcXP style)', () => {
        const objPodcast = new Podcast(props);
        const result = objPodcast.render();

        const keys = Object.keys(result).sort((a, b) => a.localeCompare(b));

        expect(keys).toEqual(
            [
                'currentPage',
                'episodes',
                'episodesPerPage',
                'nextPage',
                'totalEpisodes',
                'totalPages'
            ].sort((a, b) => a.localeCompare(b))
        );
    });
});
