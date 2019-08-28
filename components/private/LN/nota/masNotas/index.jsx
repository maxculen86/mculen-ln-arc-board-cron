import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleList from './articleList';

const index = props => {
    const {
        customFields: { cantidadNotas, filtrar },
        globalContent: {
            taxonomy: {
                primary_section: { _id, _website, name }
            }
        }
    } = props;
    // const filtrar = (filtrar === 'Ultimas Noticias') ? true : false;
    console.log('filtros: ', filtrar);
    return (
        _id && (
            <div className="row">
                <h3 className="com-title-section-s hlp-marginBottom-30">
                    {/** 
                        TODO: Considerar este componente para common
                        con titulo dinamico
                    */}
                    Mas recetas de
                    <strong>{` ${name}`}</strong>
                </h3>
                <section className="row-gap-tablet-3 row-gap-desksm-3 hlp-marginBottom-40">
                    <ArticleList
                        cantidadNotas={cantidadNotas}
                        sectionId={_id}
                        website={_website}
                        destination="article"
                    />
                </section>
            </div>
        )
    );
};

// MasRecetas.propType = {
//     type: PropTypes.string.isRequired
// };

export default index;
