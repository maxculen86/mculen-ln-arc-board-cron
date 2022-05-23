import Header from './elements/header';
import Text from './elements/text';
import Quote from './elements/quote';
import Embed from './elements/embed';
import Html from './elements/htmlContent';
import Button from './elements/button';
import List from './elements/list';
import Image from './elements/image';
import Video from './elements/video';
import Gallery from './elements/gallery';
import CustomEmbed from './elements/custom_embed';
import StoryBody from '../../../common/story/cuerpo/index';

const cuerpoIndex = dataNota => {
    const storyBodyElements = {
        Text,
        Header,
        Quote,
        Embed,
        Html,
        Button,
        List,
        Image,
        Video,
        Gallery,
        CustomEmbed
    };
    return StoryBody(dataNota, storyBodyElements);
};

export default cuerpoIndex;
