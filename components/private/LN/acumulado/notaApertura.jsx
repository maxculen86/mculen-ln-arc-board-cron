/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ArticleAcum from './articleAcum';
import ModRowGap from '../../common/mod-rowgap';
import { replaceAllUrlsResizerObject } from '../common/utils/mediaHelper';

const NotaApertura = props => {
    const ARTICLE_TYPE = 'Grilla';
    const DATA_SECTION = 'AperturaAcu';
    const { outputType, articlesInCollection = [] } = props;

    if (articlesInCollection.length === 0) return null;

    return (
        <ModRowGap column="2" classCondition="--opening">
            {articlesInCollection.map((art, i) => (
                <ArticleAcum
                    key={art._id}
                    article={i === 0 ? replaceAllUrlsResizerObject(art) : art}
                    dataSection={DATA_SECTION}
                    typeArticle={ARTICLE_TYPE}
                    outputType={outputType}
                    withSubhead={false}
                    titleTag="h2"
                    titleSize="--l"
                    isApertura={i === 0}
                />
            ))}
        </ModRowGap>
    );
};

NotaApertura.propTypes = {
    articlesInCollection: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string
};

NotaApertura.defaultProps = {
    outputType: 'default'
};

export default NotaApertura;
