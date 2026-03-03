import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context, { useAppContext } from 'fusion:context';
import { place } from '../../../private/common/utils/firmaHelper';
import { useSignatureRules } from './hooks/useSignatureRules';
import { buildSocialItems } from './utils/socialHelpers';
import { signatureVariants } from './components/styles';
import BiographyAccordion from './components/BiographyAccordion';
import AuthorsAndSocialLinks from './components/AuthorsAndSocialLinks';
import Distributor from './components/Distributor';
import Divider from '../../ui/ln/divider/default';

function DsSignature({
    customFields = {},
    globalContent = {},
    ignoreDistributor = false,
    showPhoto = true
} = {}) {
    const { layout, siteProperties } = useAppContext();
    const opinionLayout = siteProperties?.layoutsName?.NotaOpinion;
    const isOpinionLayout = Boolean(opinionLayout) && layout === opinionLayout;
    const { flags, data } = useSignatureRules({
        customFields,
        ignoreDistributor,
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

    const shouldShowOpinionSignatureExtras =
        shouldShowAuthors && !hasMultipleAuthors && isOpinionLayout;
    const shouldShowOpinionSignatureBottomExtras =
        shouldShowOpinionSignatureExtras && position === place.Bottom;

    const socialItems = buildSocialItems(socialLinks);

    return (
        <div
            data-tw={position === place.Top ? undefined : true}
            style={{ display: 'contents' }}
        >
            <div className={signatureVariants({ position })}>
                <Divider />
                <Distributor
                    name={name}
                    mode={mode}
                    subcategory={subcategory}
                    shouldShowDistributor={shouldShowDistributor}
                />
                <AuthorsAndSocialLinks
                    photo={showPhoto ? photo : null}
                    author={author}
                    authorsText={authorsText}
                    role={role}
                    socialItems={socialItems}
                    shouldShowAuthors={shouldShowAuthors}
                />

                <BiographyAccordion
                    text={longBio}
                    shouldShowBiography={shouldShowOpinionSignatureBottomExtras}
                />
                <Divider />
            </div>
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
