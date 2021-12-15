import Header from './elements/header';
import Text from './elements/text';
import List from './elements/list';
import Quote from './elements/quote';
import StoryBodyElements from './elements';

const cuerpoIndex = dataNota => {
    const storyBodyElements = {
        Text,
        Header,
        List,
        Quote
    };

    return StoryBodyElements(dataNota, storyBodyElements);
};

export default cuerpoIndex;
