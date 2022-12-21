import { useContent } from 'fusion:content';
import { lastVideosQuery } from '../../../../../content/queries/videosSearchSource';

const useGetLastVideos = (filter, website, published) => {
    return useContent({
        source: 'videosSearchSource',
        query: {
            website,
            published,
            query: lastVideosQuery()
        },
        filter
    });
};
export default useGetLastVideos;
