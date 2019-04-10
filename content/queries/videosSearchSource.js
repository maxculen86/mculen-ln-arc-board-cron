const lastVideosObject = {
    queryName: 'lastVideos',
    query: 'sort=publish_date:desc&from=0&size=8&q=type:video'
};

export default function getQuery(queryName) {
    switch (queryName) {
        case 'lastVideos':
            return lastVideosObject.query;
        default:
            throw Error('queryName invalido');
    }
}
export const lastVideos = lastVideosObject.queryName;
