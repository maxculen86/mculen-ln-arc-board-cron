import Header from './header';
import Text from './text';
import Video from '../video';
import Image from '../image';

const defaultCuerpo = contentElements => {
    const components = [Text, Header, Image, Video];

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
