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
    const storyBodyElements = {
        Text,
        Header,
        Image,
        Video,
        List,
        Quote,
        Gallery,
        Embed,
        Html,
        Button
    };

    return StoryBody(dataNota, storyBodyElements);
};

export default cuerpoIndex;
