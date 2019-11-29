import Header from './header';
import Text from './text';

const defaultCuerpo = contentElements => {
    const components = [Header, Text];

    const resp = [];

    contentElements.forEach(v => {
        const selectedComponent = components.find(c => c.type === v.type);
        if (selectedComponent) {
            resp.push(selectedComponent(v));
        }
    });
    return resp;
};

export default defaultCuerpo;
