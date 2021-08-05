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

const defaultCuerpo = dataNota => {
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

    const resp = dataNota.content_elements
        .filter(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            if (selectedComponent) return true;
            return false;
        })
        .map(v => {
            const selectedComponent = components.find(c => c.type === v.type);
            const render = selectedComponent(v, dataNota);
            return render;
        });

    return resp;
};

export default defaultCuerpo;
