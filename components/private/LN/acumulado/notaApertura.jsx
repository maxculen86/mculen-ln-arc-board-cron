import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import withCollections from '../../common/hocs/withCollections';
import filter from '../../../../content/filters/LN/acumulado/colections';

const NotaApertura = ({ articles }) =>
    articles &&
    articles.length > 0 && (
        <div className="mod-opening">
            <section className="row-gap-tablet-2 row-gap-deskxl-2">
                {articles.map(article => (
                    <ArticleAcum
                        key={article._id}
                        article={article}
                        dataSection="CuerpoAcu"
                        extraClasses=" --border w-100-mobile"
                    />
                ))}
            </section>
        </div>
    );

NotaApertura.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired
};

export default withCollections(NotaApertura, filter, 'notaM');
