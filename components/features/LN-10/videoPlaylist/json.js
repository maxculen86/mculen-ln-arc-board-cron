import Consumer from 'fusion:consumer';
import isTodayEnabled from '../../../chains/utils/isTodayEnabled';
import { videoJWM3u8 } from '../../../private/LN/api/common/elements/videoJW';

const shouldSkipRender = ({
    enabledDays = [],
    shouldSchedule = false,
    hidePlaylist = false
}) => {
    if (!shouldSchedule) {
        return hidePlaylist;
    }

    return (
        hidePlaylist || enabledDays.length === 0 || !isTodayEnabled(enabledDays)
    );
};

class VideoPlaylistFeature {
    constructor(props) {
        this.props = props;
        this.contentKey = 'playlist';
        this.jwPlaylistId = undefined;
        const {
            arcSite: website,
            customFields: { playlistId }
        } = props;
        const source = 'jwPlaylistSource';
        if (playlistId) {
            this.jwPlaylistId = playlistId;
            this.fetchContent({
                [this.contentKey]: {
                    source,
                    query: { playlistId, website }
                }
            });
        }
    }

    render() {
        const { [this.contentKey]: content } = this.state ?? {};
        if (!content) {
            return null;
        }
        const { playlist } = content;

        if (
            shouldSkipRender(this.props.customFields) ||
            !Array.isArray(playlist) ||
            playlist.length === 0
        ) {
            return null;
        }

        const videos = playlist.map(item => {
            const {
                title,
                mediaid,
                image: posterUrl,
                duration: fullVideoDuration,
                posterVideo: previewVideoUrl
            } = item;
            const fullVideoUrl = videoJWM3u8(item.sources);
            return {
                id: mediaid,
                title,
                posterUrl,
                fullVideoUrl,
                previewVideoUrl,
                fullVideoDuration
            };
        });

        return videos;
    }
}

export default Consumer(VideoPlaylistFeature);
