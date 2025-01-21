import Consumer from 'fusion:consumer';
import { checkForId } from '../article/common/_helper-WebApi';

class CarouselFeature {
    constructor(props) {
        this.props = props;
        this.contentKey = 'carouselVideo';
        const {
            arcSite: website,
            customFields: { video }
        } = props;
        const source = 'videosJwCarruselSource';
        const id = checkForId(video);
        if (id) {
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
            previewVideoUrl,
            poster: posterUrl,
            duration: fullVideoDuration,
            posterVideo: fullVideoUrl
        } = content;
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
            badgeStyle
        };
    }
}

export default Consumer(CarouselFeature);
