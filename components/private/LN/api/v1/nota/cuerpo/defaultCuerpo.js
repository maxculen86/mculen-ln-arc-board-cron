import Header from './header';
import Text from './text';
import Video from './video';
import Image from './image';
import List from './list';
import Quote from './quote';
import Gallery from './gallery';
import Embed from './embed';
import Html from './htmlContent';
import Button from './button';

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
