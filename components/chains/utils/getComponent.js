import { Contentlab } from '@ln/contenidos-ui-contentlab';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';
import { Cajaafondo } from '@ln/contenidos-ui-cajaafondo';

const getComponent = (chainStyle, layout) => {
    const options = {
        cajaContent1: Contentlab,
        HashTag: Cajahashtag,
        bnFondo: Cajaafondo,
        default: Bngrid
    };

    return options[chainStyle] || options[layout] || Bngrid;
};

export default getComponent;
