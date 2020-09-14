import Header from '../elements/header';
import Text from '../elements/text';
import Video from '../elements/video';
import Image from '../elements/image';
import List from '../elements/list';
import Quote from '../elements/quote';
import Gallery from '../elements/gallery';
import Embed from '../elements/embed';
import Html from '../elements/htmlContent';
import Button from '../elements/button';

const defaultCuerpo = contentElements => {
    const components = [
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
    ];

    const resp = [];

    contentElements.forEach(v => {
        const selectedComponent = components.find(c => c.type === v.type);
        if (selectedComponent) {
            const render = selectedComponent(v);
            if (render) resp.push(selectedComponent(v));
        }
    });
    return resp;
};

export default defaultCuerpo;
