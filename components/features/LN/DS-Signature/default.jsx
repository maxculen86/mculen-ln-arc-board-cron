import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context, { useAppContext } from 'fusion:context';
import { SITE_LANACION } from 'fusion:environment';
import { place } from '../../../private/common/utils/firmaHelper';
import formatDistributorName from '../../../private/LN/common/utils/formatDistributorName';
// TODO front: ajustar cuando haya UI específica.
import ImageUI from '../../ui/ln/image/default';
import LinkUI from '../../ui/ln/link/default';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { useSignatureRules } from './hooks/useSignatureRules';
import { buildSocialItems } from './utils/socialHelpers';

function DsSignature({ customFields = {}, globalContent = {} } = {}) {
    const { layout, siteProperties } = useAppContext();
    const opinionLayout = siteProperties?.layoutsName?.NotaOpinion;
    const isOpinionLayout = Boolean(opinionLayout) && layout === opinionLayout;
    const { flags, data } = useSignatureRules({
        customFields,
        globalContent,
        isOpinionLayout
    });
    const { shouldShowDistributor, shouldShowAuthors, shouldRender } = flags;

    if (!shouldRender) return null;

    const {
        distributor: { name, mode, subcategory },
        authorsBlob: { author, authorsText, hasMultipleAuthors },
        photo,
        role,
        position,
        longBio,
        socialLinks = []
    } = data;

    const shouldPrefix = position === place.Bottom || hasMultipleAuthors;
    const authorsTextWithPrefix = shouldPrefix
        ? `Por ${authorsText}`
        : authorsText;
    const shouldShowOpinionSignatureExtras =
        shouldShowAuthors && !hasMultipleAuthors && isOpinionLayout;
    const shouldShowOpinionSignatureBottomExtras =
        shouldShowOpinionSignatureExtras && position === place.Bottom;
    // TODO: Despues hacer el extras de signature top para el newsletter algo asi, y renderizar con eso
    // const shouldShowOpinionSignatureTopExtras =
    //     shouldShowOpinionSignatureExtras &&
    //     position === place.Top;
    const socialItems = buildSocialItems(socialLinks);
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
                        {role && <span>{role}</span>}
                    </div>
                </div>
            )}
            {shouldShowOpinionSignatureBottomExtras && (
                <>
                    {longBio && <p>{longBio}</p>}
                    {socialItems.length > 0 && (
                        <div>
                            {socialItems.map(({ icon, url, label }) => (
                                <LinkUI
                                    key={`${icon}-${url}`}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title={`Ir a ${label}`}
                                    aria-label={`Ir a ${label}`}
                                >
                                    <IconSprite name={icon} />
                                </LinkUI>
                            ))}
                        </div>
                    )}
                </>
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
