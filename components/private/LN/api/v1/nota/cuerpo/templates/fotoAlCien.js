import Text from '../elements/text';
import Image from '../elements/image';

const fotoAlCienCuerpo = contentElements => {
    const components = [Text, Image];

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

export default fotoAlCienCuerpo;
