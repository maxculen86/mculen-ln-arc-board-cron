import React from 'react';
import { useAppContext } from 'fusion:context';
import SignatureWithAuthors from '../../signature/signatureWithAuthors';
import SignatureWithDistributor from '../../signature/signatureWithDistributor';
import { useSignature } from '../../../LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../private/common/audioNews/helpers';
import { shouldShowNoteFooterTopSignature } from '../_utils/topRenderConditions';

function Signature({ globalContent, isNotaFooter = false }) {
    const { layout, siteProperties } = useAppContext();
    const opinionLayout = siteProperties?.layoutsName?.NotaOpinion;
    const isOpinionLayout = Boolean(opinionLayout) && layout === opinionLayout;
    const {
        content_elements: contentElements,
        credits: { by: creditsBy },
        distributor = { name: 'LA NACION' },
        withFirmaDistributor,
        subtype
    } = globalContent;

    const { name, mode, subcategory } = distributor;
    const showSignatureWithDistributor =
        withFirmaDistributor && name !== 'lanacionar';

    const { medio, authors } = useSignature({
        creditsBy,
        contentElements
    });

    const { author } =
        !showSignatureWithDistributor && getAuthorsNameAndLink(authors);

    const hasAuthors = author || authors.length > 0;

    if (
        !shouldShowNoteFooterTopSignature({
            isOpinionLayout,
            showSignatureWithDistributor,
            hasAuthors
        })
    )
        return null;

    return (
        <div className="flex flex-column brand-color">
            <SignatureWithDistributor
                name={name}
                mode={mode}
                subcategory={subcategory}
                showSignatureWithDistributor={showSignatureWithDistributor}
            />
            <SignatureWithAuthors
                author={author}
                authors={authors}
                medio={medio}
                showSignatureWithAuthors={hasAuthors}
                subtype={subtype}
                isNotaFooter={isNotaFooter}
            />
        </div>
    );
}

export default Signature;
