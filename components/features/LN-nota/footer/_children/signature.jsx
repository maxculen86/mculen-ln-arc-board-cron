import React from 'react';
import PropTypes from 'fusion:prop-types';
import SignatureWithAuthors from '../../signature/signatureWithAuthors';
import SignatureWithDistributor from '../../signature/signatureWithDistributor';
import { useSignature } from '../../../LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../private/common/audioNews/helpers';

function Signature({ globalContent, isNotaFooter }) {
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

    if (!showSignatureWithDistributor && !hasAuthors) return null;

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

Signature.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                additional_properties: PropTypes.shape({
                    nodeType: PropTypes.string
                }),
                content: PropTypes.string
            })
        ),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.shape({
                        url: PropTypes.string
                    }),
                    byline: PropTypes.string,
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    type: PropTypes.string,
                    _id: PropTypes.string
                })
            )
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string,
            mode: PropTypes.string
        }),
        withFirmaDistributor: PropTypes.bool,
        subtype: PropTypes.string
    }).isRequired,
    isNotaFooter: PropTypes.bool
};

Signature.defaultProps = {
    isNotaFooter: false
};

export default Signature;
