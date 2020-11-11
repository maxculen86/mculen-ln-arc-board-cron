import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

import LogoBase from '../../common/logoBase';
import TitleArticle from './titleArticle';
import '../../../../../resources/dist/css/ln/components/title.css';
import getTooltip from '../../common/utils/getTooltip';

const titleAndIconArticle = ({
    customFields: { prefix },
    globalContent: {
        taxonomy: { sections },
        headlines,
        label,
        distributor,
        owner,
        subtype,
        siteService,
    },
    layout
}) => {
    const sponsored = get(owner, 'sponsored', false);
    const advertiser = get(label, 'marca_anunciante.text', null);

    let keyTooltip = '';
    if (sponsored) keyTooltip = 'Espacio Patrocinado';
    if (advertiser) keyTooltip = 'Content LAB';
    const tooltip = getTooltip(keyTooltip, siteService);

    return (
        <>
            <LogoBase
                sections={sections}
                layout={layout}
                distributor={distributor}
                sponsored={sponsored}
                advertiser={advertiser}
                subtype={subtype}
                tooltip={tooltip}
            />
            <TitleArticle
                prefix={prefix || ''}
                headlines={headlines}
                label={label}
            />
        </>
    );
};

titleAndIconArticle.propTypes = {
    customFields: PropTypes.shape({
        prefix: PropTypes.string.tag({
            label: 'Prefijo',
            defaultValue: ''
        })
    }).isRequired,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            volanta: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        headlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired,
        distributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }).isRequired,
        owner: PropTypes.shape({
            sponsored: PropTypes.bool
        }),
        subtype: PropTypes.string
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default titleAndIconArticle;
