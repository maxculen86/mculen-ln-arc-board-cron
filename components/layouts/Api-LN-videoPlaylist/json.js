/**
 * returns the videos array for the JW Video Playlist layout without nulls, undefineds or empty array items
 */
const apiJwVideoPlaylistLayout = ({ children }) => ({
    videos: (children[0] || []).filter(Array.isArray).flat().filter(Boolean)
});

apiJwVideoPlaylistLayout.sections = ['Body'];

export default apiJwVideoPlaylistLayout;
