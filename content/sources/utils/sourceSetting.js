/*
Document Arc
[ttl](Number): The number of seconds content fetched from this content source should be cached for. 
Default is 300 (5 minutes); the ttl cannot be set lower than 120 (2 minutes).
*/
const sourceSetting = {
    articleSourceHome: {
        ttl: 120
    },
    articleSourceNota: {
        ttl: 240
    },

    acuArticlesSource: {
        ttl: 120
    },

    liftigniterSource: {
        ttl: 120
    },

    authorSource: {
        ttl: 3600
    },

    authorsColumnistSource: {
        ttl: 600
    },

    collectionSource: {
        ttl: 120
    },

    gallerySource: {
        ttl: 600
    },

    imageResizeSource: {
        ttl: 600
    },

    imageSource: {
        ttl: 600
    },

    ottVideosSource: {
        ttl: 300
    },

    rankingArticlesSource: {
        ttl: 120
    },

    relatedSource: {
        ttl: 600
    },

    sectionSource: {
        ttl: 900
    },

    sectionsSource: {
        ttl: 900
    },

    tagSource: {
        ttl: 900
    },

    videoSource: {
        ttl: 600
    },

    videoSearchSource: {
        ttl: 600
    }
};
export default sourceSetting;
