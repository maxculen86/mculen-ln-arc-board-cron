import React, { useEffect, useRef, useState } from 'react';
import { Image as CommonImage } from '@ln/ds-common-image';
import { cx } from '@ln/ds-cva';

/**
 * @typedef {import('@ln/ds-common-image').ImageProps} ImageProps
 */

/**
 * @param {ImageProps} props
 * @returns {React.ReactElement}
 */
function Image({ className, classnames, objectFit = 'contain', ...props }) {
    const imageRef = useRef(null);

    // TODO: implementar estado en la lib @ln/ds-common-image, tenemos esto provisorio ya que no esta ejecutando el onError correctamente cuando rehidrata el componente.
    const [error, setError] = useState(false);

    useEffect(() => {
        const img = imageRef.current;
        if (img?.complete && img?.naturalWidth === 0) {
            setError(true);
        }
    }, []);

    return (
        <CommonImage
            ref={imageRef}
            objectFit={objectFit}
            classnames={{
                image: cx(
                    'h-full w-full',
                    { 'opacity-0': error },
                    className,
                    classnames?.image
                ),
                placeholder: cx(
                    'bg-[url("/pf/resources/images/ln-placeholder.svg")] bg-no-repeat bg-center bg-[length:67px]',
                    classnames?.placeholder
                ),
                wrapper: cx('h-full w-full', classnames?.wrapper)
            }}
            {...props}
        />
    );
}

export default Image;
