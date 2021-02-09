import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from '../articleAcum';
import ModRowGap from '../../../common/mod-rowgap';
import ComTitle from '../../../common/com-title';

const CajaTemasPropiedades = props => {
    const ARTICLE_TYPE = 'Grilla';
    const DATA_SECTION = 'AperturaAcu';
    const { outputType, title, url, articlesToShow = [] } = props;

    return (
        <>
            <ComTitle tag="h4" size="--l" content={title} link={url} />
            <ModRowGap>
                {articlesToShow.map((art, i) => {
                    const artWithoutDate = { ...art, display_date: '' };
                    return (
                        <ArticleAcum
                            key={artWithoutDate._id}
                            article={artWithoutDate}
                            withSubhead={false}
                            dataSection={DATA_SECTION}
                            typeArticle={ARTICLE_TYPE}
                            outputType={outputType}
                        />
                    );
                })}
            </ModRowGap>
        </>
    );
};

CajaTemasPropiedades.propTypes = {
    articlesToShow: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string
};

export default CajaTemasPropiedades;
