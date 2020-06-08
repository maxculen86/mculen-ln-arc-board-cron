import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

import LogoBase from '../../common/logoBase';
import TitleArticle from './titleArticle';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleAndIconArticle = ({
    customFields: { prefix },
    globalContent: {
        taxonomy: { sections },
        headlines,
        label,
        owner
    },
    layout
}) => {
    const sponsored = get(owner, 'sponsored', false);
    const advertiser = get(label, 'marca_anunciante.text', null);

    return (
        <>
            <LogoBase
                sections={sections}
                layout={layout}
                sponsored={sponsored}
                advertiser={advertiser}
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
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }).isRequired,
        owner: PropTypes.shape({
            sponsored: PropTypes.bool
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default titleAndIconArticle;
