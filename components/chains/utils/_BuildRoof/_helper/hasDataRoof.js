import { CHAIN_STYLE } from '../../common/_helpers-WebApi';

const { HASHTAG } = CHAIN_STYLE;

const hasDataRoof = ({ chainStyle }) => {
    const stylesExcluded = [HASHTAG];
    return !stylesExcluded.includes(chainStyle);
};

export default hasDataRoof;
