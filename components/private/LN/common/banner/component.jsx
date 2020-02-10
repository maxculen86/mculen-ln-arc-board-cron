import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArcAd from './arcWrapper';

import '../../../../../resources/dist/css/ln/layouts/grid.css';

// TODO: test pendientes hasta tener el html final. Falta definicion de div contenedor cuando es background.
// Falta la clase si es desktop, tablet, mobile. Confirmar.
const bannerComponent = ({
    slotId,
    dfpId,
    slotName,
    dimensions,
    targeting,
    bidding,
    sticky,
    background,
    device,
    extraClasses,
    outputType,
    taxonomy
}) => {
    const { sections, tags } = taxonomy
        ? taxonomy
        : {
              sections: [],
              tags: []
          };

    const buildTargeting = (source, prefix = 'ca_', string = '') => {
        let outcome = string;
        if (outcome.length > 0) outcome += '|';
        source.forEach((element, i) => {
            if (element.name)
                outcome += prefix.concat(element.name.toLowerCase());
            if (element.text)
                outcome += prefix.concat(element.text.toLowerCase());
            if (i < source.length - 1) outcome += '|';
        });
        return outcome;
    };

    let ad = <></>;

    if (outputType === 'default') {
        ad = (
            <ArcAd
                className={`--${device}${
                    sticky ? ' --sticky' : ''
                } ${extraClasses || ''}`}
                id={slotId}
                dfpId={dfpId}
                slotName={slotName}
                dimensions={dimensions}
                targeting={targeting}
                bidding={bidding}
            />
        );

        if (background) {
            ad = <div className="banner w-100 --bg-banner hlp-none">{ad}</div>;
        }
    }

    if (outputType === 'amp') {
        if (!slotId.includes('amp')) return <></>;
        /**
         * Para armar json con targeting:
         * Tomar en cuenta sections y tags
         * - {"targeting":{"tags": ["ca_turismo|ca_comun|ca_viajes|te_ohlala_viaja"], "tags_nuevos":["ca_turismo","ca_comun","ca_viajes","te_ohlala_viaja"] }
         */

        const json = {
            targeting: {
                tags: [
                    `${buildTargeting(sections, 'ca_', '')}${buildTargeting(
                        tags,
                        'te_',
                        ''
                    )}`
                ],
                tags_nuevos: sections
                    .map(section => 'ca_'.concat(section.name).toLowerCase())
                    .concat(
                        tags.map(tag => 'te_'.concat(tag.text).toLowerCase())
                    )
            }
        };

        ad = (
            <amp-ad
                id={`${slotId}`}
                type="doubleclick"
                class="banner"
                width={dimensions.width}
                height={dimensions.height}
                data-slot={`/133919216/AMP/ROS/${slotId}`}
                json={`${JSON.stringify(json)}`}
            />
        );

        if (sticky) {
            ad = (
                <div className="w-100 --bg-banner hlp-desksm-none">
                    <amp-sticky-ad layout="nodisplay">{ad}</amp-sticky-ad>
                </div>
            );
        } else {
            ad = <div className="w-100 --bg-banner">{ad}</div>;
        }
    }

    return ad;
};

bannerComponent.propTypes = {
    slotId: PropTypes.string.isRequired,
    dfpId: PropTypes.number.isRequired,
    slotName: PropTypes.string.isRequired,
    // TODO: ver como verifiar que sean de estos tipos pero sin hacer shape ya que no importa en este paso que tienen esas props adentro
    dimensions: PropTypes.array.isRequired,
    targeting: PropTypes.object.isRequired,
    bidding: PropTypes.object.isRequired,
    taxonomy: PropTypes.shape({
        sections: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string)
    })
};

export default bannerComponent;
