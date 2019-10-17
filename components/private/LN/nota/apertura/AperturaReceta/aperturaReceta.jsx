import React from 'react';
import PropTypes from 'fusion:prop-types';
import AperturaConDestacado from './AperturaConDestacado';
import AperturaSinDestacado from './AperturaSinDestacado';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';

const aperturaReceta = props => {
    const {
        globalContent: {
            promo_items: promoItems,
            taxonomy,
            taxonomy: { tags }
        }
    } = props;

    const primary = taxonomy.primary_section;

    let listSections = [];
    if (primary) {
        listSections = taxonomy.sections.filter(x =>
            x.additional_properties.original.ancestors.default.includes(
                primary.additional_properties.original.ancestors.default[0]
            )
        );
    }

    const hasMultimedia = !!(!!promoItems && promoItems.basic);

    const aperturaVacio = !!(
        tags.length === 0 &&
        listSections.length === 0 &&
        promoItems === undefined
    );

    return (
        <>
            {aperturaVacio ? null : (
                <div
                    className={`row aper-receta w-100 ${
                        hasMultimedia ? '' : 'sin-foto'
                    }`}
                >
                    {hasMultimedia ? (
                        <AperturaConDestacado {...props} />
                    ) : (
                        <AperturaSinDestacado
                            tags={tags}
                            taxonomy={taxonomy}
                            receta={!!promoItems && promoItems.receta}
                        />
                    )}
                </div>
            )}
        </>
    );
};

aperturaReceta.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    description: PropTypes.string,
                    slug: PropTypes.string,
                    text: PropTypes.string
                })
            ).isRequired
        }),
        promo_items: PropTypes.shape({
            receta: PropTypes.object,
            basic: PropTypes.object
        })
    })
};

export default aperturaReceta;
