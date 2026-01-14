import Consumer from 'fusion:consumer';
import { checkForId } from '../../../../../../../features/LN-10/article/common/_helper-WebApi';
import { videoJWM3u8 } from '../../../../common/elements/videoJW';

class GetItemCarrusel {
    constructor(props, config = {}) {
        this.props = props;
        this.variant = config.variant ?? 'default';

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

    getVariant() {
        return this.props.customFields?.variant ?? this.variant;
    }

    render() {
        const { [this.contentKey]: content } = this.state ?? {};
        if (!content) return null;

        const {
            _id,
            poster: posterUrl,
            duration: fullVideoDuration,
            posterVideo: previewVideoUrl,
            sources
        } = content;

        const {
            customFields: {
                title,
                chapita: badge,
                chapitaStyle: badgeStyle = 'default'
            }
        } = this.props;

        const variant = this.getVariant();
        const fullVideoUrl = videoJWM3u8(sources, variant);

        if (!fullVideoUrl) {
            console.warn(' ItemCarrusel sin video válido', {
                jwVideoId: this.jwVideoId,
                variant
            });
            return null;
        }

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

export default Consumer(GetItemCarrusel);
