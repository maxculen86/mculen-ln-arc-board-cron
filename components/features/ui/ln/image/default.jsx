import React, { useEffect, useRef, useState } from 'react';
import { Image as CommonImage } from '@ln/ds-common-image';
import { cx } from '@ln/ds-cva';
import { replaceResizerBaseUrl } from '../../../../private/common/utils/image/resizer/v2/resizerHelper';

/**
 * @typedef {import('@ln/ds-common-image').ImageProps} ImageProps
 */

/**
 * @param {ImageProps} props
 * @returns {React.ReactElement}
 */

// TODO: Refactorizar esta funcion para evitar trabajo innecesario. Considerar usar regex.
const replaceResizerSrcSet = (srcSet = '') =>
    typeof srcSet === 'string'
        ? srcSet
              .split(',')
              .map(entry => {
                  const [url, ...descriptors] = entry.trim().split(/\s+/);
                  return [replaceResizerBaseUrl({ url }), ...descriptors]
                      .filter(Boolean)
                      .join(' ');
              })
              .join(',')
        : srcSet;

function Image({
    className,
    classnames,
    objectFit = 'contain',
    renderImgOnly = false,
    sources,
    style,
    ...props
}) {
    const imageRef = useRef(null);
    const normalizedSources = Array.isArray(sources)
        ? sources.map(source => ({
              ...source,
              ...(source.srcSet && {
                  srcSet: replaceResizerSrcSet(source.srcSet)
              }),
              ...(source.srcset && {
                  srcset: replaceResizerSrcSet(source.srcset)
              })
          }))
        : sources;
    const normalizedProps = {
        ...props,
        ...(props.src && { src: replaceResizerBaseUrl({ url: props.src }) }),
        ...(props.srcSet && {
            srcSet: replaceResizerSrcSet(props.srcSet)
        })
    };

    // TODO: implementar estado en la lib @ln/ds-common-image, tenemos esto provisorio ya que no esta ejecutando el onError correctamente cuando rehidrata el componente.
    const [error, setError] = useState(false);

    useEffect(() => {
        const img = imageRef.current;
        if (img?.complete && img?.naturalWidth === 0) {
            setError(true);
        }
    }, []);

    const imageClassName = cx(
        'h-full w-full',
        { 'opacity-0': error },
        className,
        classnames?.image
    );

    if (renderImgOnly) {
        return (
            // Usamos esto para que ESLint no marque error: `alt` llega por props.
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
                ref={imageRef}
                decoding="async"
                className={imageClassName}
                style={{ objectFit, ...style }}
                {...normalizedProps}
            />
        );
    }

    return (
        <CommonImage
            ref={imageRef}
            objectFit={objectFit}
            sources={normalizedSources}
            classnames={{
                image: imageClassName,
                placeholder: cx(
                    'bg-[url("/pf/resources/images/ln-placeholder.svg")] bg-no-repeat bg-center bg-[length:67px]',
                    classnames?.placeholder
                ),
                wrapper: cx('h-full w-full', classnames?.wrapper)
            }}
            style={style}
            {...normalizedProps}
        />
    );
}

export default Image;
