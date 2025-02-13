import Consumer from 'fusion:consumer';
import { checkForId } from '../article/common/_helper-WebApi';
import { videoJWM3u8 } from '../../../private/LN/api/common/elements/videoJW';

class CarouselFeature {
    constructor(props) {
        this.props = props;
        this.contentKey = 'carouselVideo';
        this.jwVideoId = undefined;
        const {
            arcSite: website,
            customFields: { video }
        } = props;
        const source = 'videosJwCarruselSource';
        const id = checkForId(video);
        if (id) {
            this.jwVideoId = id;
            this.fetchContent({
                [this.contentKey]: {
                    source,
                    query: { id, website }
                }
            });
        }
    }

    render() {
        const { [this.contentKey]: content } = this.state ?? {};
        if (!content) {
            return null;
        }
        const {
            _id,
            poster: posterUrl,
            duration: fullVideoDuration,
            posterVideo: previewVideoUrl
        } = content;
        const fullVideoUrl = videoJWM3u8(content.sources);
        const {
            customFields: {
                title,
                chapita: badge,
                chapitaStyle: badgeStyle = 'default'
            }
        } = this.props;
        return {
            _id,
            title,
            posterUrl,
            previewVideoUrl,
            fullVideoUrl,
            fullVideoDuration,
            badge,
            badgeStyle,
            jwVideoId: this.jwVideoId
        };
    }
}

export default Consumer(CarouselFeature);
