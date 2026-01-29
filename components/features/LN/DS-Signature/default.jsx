import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { place } from '../../../private/common/utils/firmaHelper';
import formatDistributorName from '../../../private/LN/common/utils/formatDistributorName';
// TODO front: ajustar cuando haya UI específica.
import ImageUI from '../../ui/ln/image/default';
import LinkUI from '../../ui/ln/link/default';
import { useSignatureRules } from './hooks/useSignatureRules';

function DsSignature({
    customFields = {},
    globalContent = {},
    isNotaFooter = false
} = {}) {
    const { flags, data } = useSignatureRules({
        customFields,
        globalContent,
        isNotaFooter
    });
    const { shouldShowDistributor, shouldShowAuthors, shouldRender } = flags;

    if (!shouldRender) return null;

    const {
        distributor: { name, mode, subcategory },
        authorsBlob: { author, authorsText, authors },
        photo,
        medio,
        position
    } = data;

    const hasMultipleAuthors = Array.isArray(authors) && authors.length > 1;
    const shouldPrefix = position === place.Bottom || hasMultipleAuthors;
    const authorsTextWithPrefix = shouldPrefix
        ? `Por ${authorsText}`
        : authorsText;

    return (
        <div>
            {shouldShowDistributor && (
                <div>
                    {name === 'LA NACION' || mode === 'custom' ? (
                        <span>{name}</span>
                    ) : (
                        <div>
                            <LinkUI
                                href={`${SITE_LANACION}/distributor/${formatDistributorName(
                                    name
                                )}/`}
                                title={name}
                            >
                                <span>{name}</span>
                            </LinkUI>
                            {subcategory.length > 0 && name === 'EL PAIS' && (
                                <span>{subcategory}</span>
                            )}
                        </div>
                    )}
                </div>
            )}
            {shouldShowAuthors && (
                <div>
                    {photo && (
                        <ImageUI src={photo} alt={author?.name || 'Autor'} />
                    )}
                    <div>
                        {authorsText && (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: authorsTextWithPrefix
                                }}
                            />
                        )}
                        {medio && <span>{medio}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}

DsSignature.propTypes = {
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        })
    }).isRequired
};

DsSignature.label = 'LN-DS-Signature';

export default Context(DsSignature);
