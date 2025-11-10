import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import {
    VIDEO,
    VIDEO_VERTICAL
} from '../../../../private/common/utils/subtypes/subtypeHelper';

function MediaImage({ src, alt, sources, className }) {
    const {
        globalContent: { subtype }
    } = useAppContext() || {};

    const layoutsWithoutAspectRatio = [VIDEO, VIDEO_VERTICAL];
    return (
        <div className={`w-100 ${className || ''}`}>
            <Adaptableimage
                alt={alt}
                className={cx([
                    'w-100',
                    !layoutsWithoutAspectRatio.includes(subtype) && 'ratio-16-9'
                ])}
                fetchPriority="high"
                loading="eager"
                sources={sources}
                src={src}
            />
        </div>
    );
}

MediaImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({})),
    className: PropTypes.string
};

MediaImage.defaultProps = {
    alt: '',
    sources: [],
    className: ''
};

export default MediaImage;
