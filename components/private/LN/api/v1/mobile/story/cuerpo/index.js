import Header from './elements/header';
import Text from './elements/text';
import Quote from './elements/quote';
import Embed from './elements/embed';
import Html from './elements/htmlContent';
import Button from './elements/button';
import List from './elements/list';
import Image from './elements/image';
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
        Image
    };
    return StoryBody(dataNota, storyBodyElements);
};

export default cuerpoIndex;
