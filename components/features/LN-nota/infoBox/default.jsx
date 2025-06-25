import React from 'react';
import { Zocalo } from '@ln/contenidos-ui-zocalo';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { getZocaloProps, getViolenceTagsZocaloProps } from './helper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { VIOLENCE_TAGS } from './constants/tags';

function InfoBoxFeature({ customFields }) {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: { tags = [], primary_section: { path = '' } = {} } = {}
        } = {}
    } = useAppContext();
    const { link, tagList = [] } = customFields;
    const hasCustomTags = tagList.length > 0;

    const isTagViolence = tags.some(tag => VIOLENCE_TAGS.includes(tag.slug));

    const zocaloConfig =
        isTagViolence || hasCustomTags
            ? getViolenceTagsZocaloProps(deployment, contextPath, path)
            : getZocaloProps(deployment, contextPath, path);

    if (hasCustomTags) zocaloConfig.linkProps.href = link;
    if (!zocaloConfig.showZocalo) return null;

    return (
        <Zocalo
            linkProps={zocaloConfig.linkProps}
            imgProps={zocaloConfig.imgProps}
            className="mb-32"
            logoProps={zocaloConfig.logoProps}
            descriptionProps={zocaloConfig.descriptionProps}
            onClick={() =>
                addEventToDataLayerV2({
                    event: 'e_linkclick',
                    action: 'zocalo_nota',
                    category: 'nota_ln9',
                    label: zocaloConfig.label
                })
            }
        />
    );
}

InfoBoxFeature.label = 'LN Caja Zocalo';
InfoBoxFeature.lazy = true;

InfoBoxFeature.propTypes = {
    customFields: PropTypes.shape({
        tagList: PropTypes.list.tag({
            label: 'Tag',
            group: 'Tags'
        }).isRequired,
        link: PropTypes.string.tag({
            name: 'Enlace Personalizado',
            description: 'Introduzca tags para mostrar el enlace de este campo',
            defaultValue: '',
            group: 'Tags'
        })
    }).isRequired
};

export default InfoBoxFeature;
