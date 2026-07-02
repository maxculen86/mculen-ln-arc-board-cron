import React from 'react';
import { cx } from '@ln/ds-cva';

/**
 * Bloque de autor/distribuidor y texto complementario.
 *
 * @param {object} props
 * @param {string} props.distributor - Nombre del distribuidor (link destacado).
 * @param {string} props.complementaryText - Texto complementario al distribuidor.
 * @param {string} props.href - URL del distribuidor.
 * @returns {React.ReactElement}
 */

function AuthorAndDescription({ distributor, complementaryText, href }) {
    if (!distributor && !complementaryText) return null;

    const hasLink = Boolean(href);

    const distributorClassName = cx(
        'text-label-lg tracking-(--tracking-normal) leading-[100%] font-bold ',
        hasLink ? 'text-primary-default' : 'text-secondary-default',
        {
            'underline underline-offset-2 decoration-2 [text-decoration-skip-ink:none]':
                distributor !== 'LA NACION'
        }
    );
    const distributorContent =
        distributor &&
        (hasLink ? (
            <a href={href} className={distributorClassName}>
                {distributor}
            </a>
        ) : (
            <span className={distributorClassName}>{distributor}</span>
        ));

    return (
        <div className="flex flex-row items-center md:w-auto md:shrink-0 min-h-20">
            <div className="flex flex-row items-center gap-8">
                {distributorContent}
                {complementaryText && (
                    <span className="text-small-lg font-normal text-base-default">
                        {complementaryText}
                    </span>
                )}
            </div>
        </div>
    );
}

AuthorAndDescription.displayName = 'ArticleFooterUi.AuthorAndDescription';

export default AuthorAndDescription;
