import { Contentlab } from '@ln/contenidos-ui-contentlab';
import { Bngrid } from '@ln/contenidos-ui-bngrid';

const getComponent = (chainStyle, layout) => {
    const options = {
        cajaContent1: Contentlab,
        // hashtag: Cajahashtag,
        default: Bngrid
    };

    return options[chainStyle] || options[layout] || options.default;
};

export default getComponent;
