import React from 'react';
import { Zocalo } from '@ln/contenidos-ui-zocalo';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { getZocaloProps, getViolenceTagsZocaloProps } from './helper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

function InfoBoxFeature({ customFields }) {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: { tags = [], primary_section: { path = '' } = {} } = {}
        } = {}
    } = useAppContext();
    const { link = '', tagList = [] } = customFields;

    const isTagViolence = tags.some(tag => tagList.includes(tag.slug));
    const hasLink = link.length > 0;

    const zocaloConfig = isTagViolence
        ? getViolenceTagsZocaloProps(deployment, contextPath, path)
        : getZocaloProps(deployment, contextPath, path);

    const titleContent = isTagViolence ? (
        <mark>{zocaloConfig.descriptionProps.title}</mark>
    ) : (
        zocaloConfig.descriptionProps?.title
    );

    const descriptionContent = {
        ...zocaloConfig.descriptionProps,
        title: titleContent
    };

    if (hasLink && isTagViolence) zocaloConfig.linkProps.href = link;
    if (!zocaloConfig.showZocalo) return null;

    return (
        <Zocalo
            linkProps={zocaloConfig.linkProps}
            imgProps={zocaloConfig.imgProps}
            className="mb-32"
            logoProps={zocaloConfig.logoProps}
            descriptionProps={descriptionContent}
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
