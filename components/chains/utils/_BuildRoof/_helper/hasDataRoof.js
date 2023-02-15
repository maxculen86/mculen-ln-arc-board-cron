import { CHAIN_STYLE } from '../../_helpers';

const { HASHTAG } = CHAIN_STYLE;

const hasDataRoof = ({ chainStyle }) => {
    const stylesExcluded = [HASHTAG];
    return !stylesExcluded.includes(chainStyle);
};

export default hasDataRoof;
