import BlockQuote from '../../../../private/LN/nota/cuerpo/blockQuote';
import Subtitle from '../../../../private/LN/nota/cuerpo/subtitle';
import Gallery from '../../../../private/LN/common/carrousell';
import ListOrderedOrUnordered from '../../../../private/LN/nota/cuerpo/listOrderedOrUnordered';
import Image from '../../../../private/LN/nota/cuerpo/image';
import VideoJW from '../../../../private/common/videoPlayerJw/index';
import RawHTML from '../../../../private/LN/common/rawHTML';
import BotonLink from '../../../../private/LN/nota/cuerpo/botonLink';
import Html from '../../../../private/LN/nota/cuerpo/html';
import Table from '../../../../private/LN/nota/cuerpo/table';
import Divider from '../../../../private/LN/nota/cuerpo/divider';
import PowerUpLiveBlog from '../../../../private/LN/nota/cuerpo/powerUpLiveBlog';
import Paragraph from '../../../../private/LN/nota/cuerpo/parrafo';

const bodyComponents = {
    text: Paragraph,
    blockquote: BlockQuote,
    header: Subtitle,
    gallery: Gallery,
    list: ListOrderedOrUnordered,
    image: Image,
    oembed_response: RawHTML,
    raw_html: Html,
    interstitial_link: BotonLink,
    table: Table,
    divider: Divider,
    video_jw: VideoJW,
    'custom-liveblog': PowerUpLiveBlog
};

export default bodyComponents;
