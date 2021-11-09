import header from './elements/header';
import text from './elements/text';
import video from './elements/video';
import image from './elements/image';
import list from './elements/list';
import quote from './elements/quote';
import gallery from './elements/gallery';
import embed from './elements/embed';
import html from './elements/htmlContent';
import button from './elements/button';
import body from '../../../common/nota/cuerpo/index';

const cuerpoIndex = dataNota => {
    const storyElementBySubtype = {
        1: {
            text,
            header,
            image,
            video,
            list,
            quote,
            gallery,
            embed,
            html,
            button
        },
        7: {
            text,
            header,
            image,
            video,
            list,
            quote,
            gallery,
            embed,
            html,
            button
        },
        8: { text, image }
    };

    return body(dataNota, storyElementBySubtype);
};

export default cuerpoIndex;
