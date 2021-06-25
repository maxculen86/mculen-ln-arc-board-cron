import React from 'react';
import PropTypes from 'fusion:prop-types';

import withRankingData from '../hocs/WithRankingData';
import '../../../../../resources/dist/css/ln/components/ranking.css';
import CajaTema from '../cajaTema';

const Ranking = ({ articles, dataSection, title, outputType }) => {
    return articles && articles.length ? (
        <CajaTema
            title={title}
            notesQuantity={1}
            sectionName="Ranking"
            articles={articles}
            position="toi"
            dataSection={dataSection}
            outputType={outputType}
            classCondition="com-ranking"
            withVolanta={false}
        />
    ) : null;
};

Ranking.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    dataSection: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired
};

Ranking.defaultProps = {
    articles: []
};

export default withRankingData(Ranking, 'm');
