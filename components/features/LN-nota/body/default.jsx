import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
import BaseBodyWrapper from './_children/BaseBodyWrapper';
import registerScrollTracking from '../../LN/DS-Body/helpers/registerScrollTracking';
import RenderRatingNote from '../../../private/common/layouts/renderRatingNote';

function body({ customFields }) {
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, content_elements: contentElements } = globalContent;

    return (
        <BaseBodyWrapper
            contentElements={contentElements}
            outputType={outputType}
            noteId={_id}
            onRegisterScrollTrigger={registerScrollTracking}
        >
            <RenderRatingNote />
            {BuildBody({
                banners,
                outputType,
                globalContent
            })}
        </BaseBodyWrapper>
    );
}

body.label = 'LN-Nota-Body';

body.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

export default body;
