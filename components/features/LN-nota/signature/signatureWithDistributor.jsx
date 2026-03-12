import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';
import formatDistributorName from '../../../private/LN/common/utils/formatDistributorName';

function SignatureWithDistributor({
    name,
    mode,
    subcategory = '',
    audioButton,
    showSignatureWithDistributor,
    classNameSignature = ''
}) {
    if (!showSignatureWithDistributor) return null;

    const showDisclaimer = subcategory.length > 0 && name === 'EL PAIS';

    const signatureDistributorHtml = nombre =>
        nombre === 'LA NACION' || mode === 'custom' ? (
            <Text className={cx('font-bold --xs', classNameSignature)}>
                {nombre}
            </Text>
        ) : (
            <div className="flex gap-4 ai-center">
                <Link
                    href={`${SITE_LANACION}/distributor/${formatDistributorName(nombre)}/`}
                    title={nombre}
                >
                    <Text
                        className={cx('font-bold --twoxs', classNameSignature)}
                    >
                        {nombre}
                    </Text>
                </Link>
                {showDisclaimer && (
                    <Text className="text-12 text-neutral-light-800">
                        {subcategory}
                    </Text>
                )}
            </div>
        );

    return (
        <div className="flex flex-column gap-16 w-100 flex-row_m ai-center_m ai-start">
            {signatureDistributorHtml(name)}
            {audioButton}
        </div>
    );
}

export default SignatureWithDistributor;
