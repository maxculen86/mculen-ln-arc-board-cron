import { useContent } from 'fusion:content';
import { lastVideosQuery } from '../../../../../content/queries/videosSearchSource';

const useGetLastVideos = (filter, website, published) => {
    const videos = useContent({
        source: 'videosSearchSource',
        query: {
            website,
            published,
            query: lastVideosQuery()
        },
        filter
    });
    return videos;
};
export default useGetLastVideos;
