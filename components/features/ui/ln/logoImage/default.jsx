import React from 'react';
import { getLogoSize } from './styles';

/**
 * @typedef {'xs'|'sm'|'md'} LogoSize
 *
 * @typedef {Object} LogoImageProps
 * @property {string} src                                   - URL estática del SVG del logo (resuelta externamente)
 * @property {string} logoName                              - Nombre del logo, usado para resolver dimensiones
 * @property {LogoSize} [size]                              - Tamaño deseado (default: 'sm')
 * @property {string} [alt]                                 - Texto alternativo
 * @property {string} [href]                                - Si se pasa, el logo queda envuelto en un <a>
 * @property {string} [target]
 * @property {string} [rel]
 * @property {React.AnchorHTMLAttributes<HTMLAnchorElement>} [anchorProps] - Props extras para el <a>
 * @property {React.ImgHTMLAttributes<HTMLImageElement>}    [imgProps]     - Props extras para el <img>
 */

/**
 * Componente presentacional de logo.
 * Resuelve dimensiones a partir de logoName + size y renderiza la imagen.
 * No tiene dependencias de Fusion ni lógica de negocio.
 *
 * @param {LogoImageProps} props
 * @returns {React.ReactElement|null}
 */
function LogoImage({
    src,
    logoName,
    size = 'sm',
    alt = '',
    href,
    target,
    rel,
    anchorProps = {},
    imgProps = {}
}) {
    if (!src) return null;

    const { w, h } = getLogoSize(logoName, size);
    const style = {
        width: w ?? 'auto',
        ...(h !== undefined && { height: h })
    };

    const img = (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            fetchPriority="low"
            style={style}
            {...imgProps}
        />
    );

    if (!href) return img;

    return (
        <a href={href} target={target} rel={rel} {...anchorProps}>
            {img}
        </a>
    );
}

export default LogoImage;
