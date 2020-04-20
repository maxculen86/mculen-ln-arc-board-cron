import MetaTagsFactory from './metaTagsFactory';
import getMetasOG from './getMetasOG';

const MetasOG = props => {
    const metas = getMetasOG(props);
    const elements = metas && metas.map(meta => MetaTagsFactory(meta));
    return elements;
};

export default MetasOG;
