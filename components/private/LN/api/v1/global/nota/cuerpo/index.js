import Header from './elements/header';
import Text from './elements/text';
import Video from './elements/video';
import Image from './elements/image';
import List from './elements/list';
import Quote from './elements/quote';
import Gallery from './elements/gallery';
import Embed from './elements/embed';
import Html from './elements/htmlContent';
import Button from './elements/button';
import StoryBody from '../../../common/nota/cuerpo/index';

const cuerpoIndex = dataNota => {
    const storyElementBySubtype = {
        1: {
            text: Text,
            header: Header,
            image: Image,
            video: Video,
            list: List,
            quote: Quote,
            gallery: Gallery,
            embed: Embed,
            raw_html: Html,
            button: Button
        },
        7: {
            text: Text,
            header: Header,
            image: Image,
            video: Video,
            list: List,
            quote: Quote,
            gallery: Gallery,
            embed: Embed,
            raw_html: Html,
            button: Button
        },
        8: { text: Text, image: Image }
    };

    return StoryBody(dataNota, storyElementBySubtype);
};

export default cuerpoIndex;
