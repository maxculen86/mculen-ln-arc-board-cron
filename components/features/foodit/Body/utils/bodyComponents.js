import Html from '../../../private-global/body/html/foodit';
import BlockQuote from '../../../private-global/body/blockQuote/foodit';
import Subtitle from '../../../private-global/body/subtitle/foodit';
import ListOrderedOrUnordered from '../../../private-global/body/listOrderedOrUnordered/foodit';
import Image from '../../../private-global/body/image/foodit';
import BotonLink from '../../../private-global/body/buttonLink/foodit';
import Divider from '../../../private-global/body/divider/foodit';
import Paragraph from '../../../private-global/body/paragraph/foodit';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';
import RawHTML from '../../../private-global/body/rawHTML/foodit';
import PowerUpPreparacion from '../../../private-global/body/powerUpPreparacion/foodit';

const bodyComponents = {
    text: Paragraph,
    blockquote: BlockQuote,
    header: Subtitle,
    list: ListOrderedOrUnordered,
    image: Image,
    oembed_response: RawHTML,
    raw_html: Html,
    interstitial_link: BotonLink,
    divider: Divider,
    video_jw: VideoPlayer,
    'custom-preparacion': PowerUpPreparacion
};

export default bodyComponents;
