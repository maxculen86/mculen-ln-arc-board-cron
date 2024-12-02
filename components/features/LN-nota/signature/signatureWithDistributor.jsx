import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import formatDistributorName from '../../../private/LN/common/utils/formatDistributorName';

function SignatureWithDistributor({
    name,
    mode,
    audioButton,
    showSignatureWithDistributor
}) {
    if (!showSignatureWithDistributor) return null;

    const signatureDistributorHtml = nombre =>
        nombre === 'LA NACION' || mode === 'custom' ? (
            <Text className="font-bold --xs">{nombre}</Text>
        ) : (
            <Link
                href={`${SITE_LANACION}/distributor/${formatDistributorName(nombre)}/`}
                title={nombre}
            >
                <Text className="font-bold --twoxs">{nombre}</Text>
            </Link>
        );

    return (
        <div className="flex flex-column gap-16 w-100 flex-row_m ai-center_m ai-start">
            {signatureDistributorHtml(name)}
            {audioButton}
        </div>
    );
}

SignatureWithDistributor.propTypes = {
    name: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    audioButton: PropTypes.node.isRequired,
    showSignatureWithDistributor: PropTypes.bool.isRequired
};

export default SignatureWithDistributor;
