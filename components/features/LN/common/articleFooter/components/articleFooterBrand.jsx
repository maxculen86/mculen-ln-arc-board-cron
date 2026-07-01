import React from 'react';
import Image from '../../../../ui/ln/image/default';

/**
 * @typedef {import('@ln/ds-common-image').ImageProps} ImageProps
 */

/**
 * Logo/marca asociada a la nota. Recibe un objeto ImageProps.
 *
 * @param {ImageProps} props
 * @returns {React.ReactElement}
 */
function Brand({ objectFit = 'contain', ...imageProps }) {
    if (!imageProps?.src) return null;
    return (
        <div className="h-32 flex align-center">
            <Image objectFit={objectFit} hidePlaceholder {...imageProps} />
        </div>
    );
}

Brand.displayName = 'ArticleFooterUi.Brand';

export default Brand;
