import Text from '../elements/text';
import Image from '../elements/image';

const fotoAlCienCuerpo = contentElements => {
    const components = [Text, Image];

    const resp = contentElements
        .filter(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            if (selectedComponent) return true;
            return false;
        })
        .map(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            const render = selectedComponent(v);
            if (render) return selectedComponent(v);
            return null;
        });

    return resp;
};

export default fotoAlCienCuerpo;
