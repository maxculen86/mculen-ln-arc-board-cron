import Html from '../../../private-global/body/html/foodit';
import BlockQuoteComponent from '../../../private-global/body/blockQuote/foodit';
import Subtitle from '../../../private-global/body/subtitle/foodit';
import ListOrderedOrUnorderedComponent from '../../../private-global/body/listOrderedOrUnordered/foodit';
import ImageComponent from '../../../private-global/body/image/foodit';
import BotonLinkComponent from '../../../private-global/body/buttonLink/foodit';
import DividerComponent from '../../../private-global/body/divider/foodit';
import Paragraph from '../../../private-global/body/paragraph/foodit';
import VideoPlayer from '../../../private-global/common/videoPlayer/foodit';
import RawHTML from '../../../private-global/body/rawHTML/foodit';
import PowerUpPreparacionComponent from '../../../private-global/body/powerUpPreparacion/foodit';
import TableComponent from '../../../private-global/body/table/foodit';
import ConsecutiveImages from '../../../private-global/body/doubleImage/foodit';
import PowerUpEmbedCard from '../../../private-global/body/powerUpEmbedCard/foodit';

const bodyComponents = {
    text: Paragraph,
    blockquote: BlockQuoteComponent,
    header: Subtitle,
    list: ListOrderedOrUnorderedComponent,
    image: ImageComponent,
    doubleImage: ConsecutiveImages,
    oembed_response: RawHTML,
    raw_html: Html,
    interstitial_link: BotonLinkComponent,
    divider: DividerComponent,
    video_jw: VideoPlayer,
    'custom-preparacion': PowerUpPreparacionComponent,
    table: TableComponent,
    'custom-card-embebida': PowerUpEmbedCard
};

export default bodyComponents;
