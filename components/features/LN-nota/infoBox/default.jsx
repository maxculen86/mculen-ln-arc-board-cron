import React from 'react';
import { Zocalo } from '@ln/contenidos-ui-zocalo';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import {
    getZocaloProps,
    getViolenceTagsZocaloProps,
    generateGroupedCustomFieldsPropTypes,
    getMatchedZocaloGroup,
    groupNames
} from './helper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

function InfoBoxFeature({ customFields }) {
    const {
        contextPath,
        deployment,
        globalContent: {
            taxonomy: { tags = [], primary_section: { path = '' } = {} } = {}
        } = {}
    } = useAppContext();

    const matched = getMatchedZocaloGroup(groupNames, customFields, tags);

    const matchedLink = matched?.link || '';
    const zocaloGroup = matched?.group || '';

    const isTagMatched = matched !== null;

    const zocaloConfig = isTagMatched
        ? getViolenceTagsZocaloProps(deployment, contextPath, zocaloGroup)
        : getZocaloProps(deployment, contextPath, path);

    const titleContent = isTagMatched ? (
        <mark>{zocaloConfig.descriptionProps.title}</mark>
    ) : (
        zocaloConfig.descriptionProps?.title
    );

    const descriptionContent = {
        ...zocaloConfig.descriptionProps,
        title: titleContent
    };

    if (matchedLink && isTagMatched) zocaloConfig.linkProps.href = matchedLink;
    if (!zocaloConfig.showZocalo) return null;

    return (
        <Zocalo
            linkProps={zocaloConfig.linkProps}
            imgProps={zocaloConfig.imgProps}
            mediaDynamicComponent={zocaloConfig.mediaDynamicComponent}
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
        ...generateGroupedCustomFieldsPropTypes(groupNames)
    }).isRequired
};

export default InfoBoxFeature;
