import MetaTagsFactory from './metaTagsFactory';
import getMetasOG from './getMetasOG';

const MetasOG = props => {
    const metas = getMetasOG(props);
    return metas && metas.map(meta => MetaTagsFactory(meta));
};

export default MetasOG;
