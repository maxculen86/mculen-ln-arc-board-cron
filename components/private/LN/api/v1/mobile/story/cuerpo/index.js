import Header from './elements/header';
import Text from './elements/text';
import Quote from './elements/quote';
import Embed from './elements/embed';
import Html from './elements/htmlContent';
import Button from './elements/button';
import List from './elements/list';
import Image from './elements/image';
import Video from './elements/video';
import VideoJW from './elements/videoJW';
import Gallery from './elements/gallery';
import CustomEmbed from './elements/custom_embed';
import StoryBody from '../../../../common/elements/story/cuerpo/index';
import Table from './elements/table';
import Numeric_rating from './elements/numeric_rating';
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
        VideoJW,
        Gallery,
        CustomEmbed,
        Table,
        Numeric_rating
    };
    return StoryBody(dataNota, storyBodyElements);
};

export default cuerpoIndex;
