import { Contentlab } from '@ln/contenidos-ui-contentlab';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';

const getComponent = (chainStyle, layout) => {
    const options = {
        cajaContent1: Contentlab,
        Hashtag: Cajahashtag,
        default: Bngrid
    };

    return options[chainStyle] || options[layout] || options.default;
};

export default getComponent;
