import React from 'react';
import AperturaConDestacado from './AperturaConDestacado';
import AperturaSinDestacado from './AperturaSinDestacado';
import { getFirstParentSection } from '../../../../common/utils/sectionUtils';

function aperturaReceta({ globalContent = {}, ...props }) {
    const { promo_items: promoItems, taxonomy = {} } = globalContent;
    const { tags, primary_section: primary, sections = [] } = taxonomy;

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
        <div className="row aper-receta w-100-mobile">
            {hasMultimedia ? (
                <AperturaConDestacado
                    globalContent={globalContent}
                    {...props}
                />
            ) : (
                <AperturaSinDestacado
                    tags={tags}
                    taxonomy={taxonomy}
                    receta={!!promoItems && promoItems.receta}
                />
            )}
        </div>
    );
}

export default aperturaReceta;
