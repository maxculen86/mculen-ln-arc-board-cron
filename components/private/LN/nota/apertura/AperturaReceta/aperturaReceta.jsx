import React from 'react';
import PropTypes from 'prop-types';
import AperturaConDestacado from './AperturaConDestacado';
import AperturaSinDestacado from './AperturaSinDestacado';
import { getFirstParentSection } from '../../../../common/utils/sectionUtils';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';

const aperturaReceta = props => {
    const {
        globalContent: { promo_items: promoItems, taxonomy }
    } = props;

    const { tags, primary_section: primary, sections } = taxonomy;

    let listSections = [];
    if (primary) {
        const parentPrimarySection = getFirstParentSection(primary);
        if (parentPrimarySection) {
            listSections = sections.filter(x => {
                const parentSection = getFirstParentSection(x);
                return (
                    parentSection &&
                    parentSection === parentPrimarySection &&
                    x._id !== parentPrimarySection
                );
            });
        }
    }

    const hasMultimedia = !!(!!promoItems && promoItems.basic);

    const aperturaVacio = !!(
        (!tags || tags.length === 0) &&
        (!listSections || listSections.length === 0) &&
        promoItems === undefined
    );
    if (aperturaVacio) return null;

    return (
        <>
            <div
                className={`row aper-receta w-100-mobile ${
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
            ),
            primary_section: PropTypes.shape(),
            sections: PropTypes.array
        }),
        promo_items: PropTypes.shape({
            receta: PropTypes.object,
            basic: PropTypes.object
        }),
        subtype: PropTypes.string
    })
};

aperturaReceta.defaultProps = {
    globalContent: {
        taxonomy: {
            tags: []
        }
    }
};

export default aperturaReceta;
