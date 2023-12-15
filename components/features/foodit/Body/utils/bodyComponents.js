import BlockQuote from '../../../foodit-global/Body/blockQuote/foodit';
import Subtitle from '../../../foodit-global/Body/subtitle/foodit';
import Gallery from '../../../../private/LN/common/carrousell';
import ListOrderedOrUnordered from '../../../foodit-global/Body/listOrderedOrUnordered/foodit';
import Image from '../../../foodit-global/Body/image/foodit';
import VideoJW from '../../../../private/common/videoPlayerJw/index';
import RawHTML from '../../../../private/LN/common/rawHTML';
import BotonLink from '../../../foodit-global/Body/buttonLink/foodit';
import Html from '../../../../private/LN/nota/cuerpo/html';
import Table from '../../../../private/LN/nota/cuerpo/table';
import Divider from '../../../foodit-global/Body/divider/foodit';
import PowerUpLiveBlog from '../../../../private/LN/nota/cuerpo/powerUpLiveBlog';
import Paragraph from '../../../foodit-global/Body/paragraph/foodit';

const bodyComponents = {
    text: Paragraph,
    blockquote: BlockQuote,
    header: Subtitle,
    gallery: Gallery, // TODO: a confirmar si se utiliza
    list: ListOrderedOrUnordered,
    image: Image,
    oembed_response: RawHTML, // TODO: agregar clases "flex as-center" al contenedor
    raw_html: Html,
    interstitial_link: BotonLink,
    table: Table, // TODO: a confirmar si se utiliza
    divider: Divider,
    video_jw: VideoJW,
    'custom-liveblog': PowerUpLiveBlog
};

export default bodyComponents;
