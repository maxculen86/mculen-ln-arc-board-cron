import React from 'react';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import { dictionaryAlt } from '../../../../private/common/utils/sectionUtils';
import { isInvalidLogo } from '../_utils/helper';
import getTargetAndRelIfExternal from '../../../../private/common/utils/getTargetAndRelIfExternal';

function Logo({ logoData }) {
    const { deployment, contextPath } = useAppContext();

    if (isInvalidLogo(logoData)) return null;

    const { path, logoName, isExternal } = logoData;

    const altLogo = dictionaryAlt?.[logoName] || logoName;

    const { target, rel } = getTargetAndRelIfExternal(isExternal);

    return (
        <div className="logo-nota-footer as-start as-center_m">
            <Link href={path} title={altLogo} target={target} rel={rel}>
                <Adaptableimage
                    src={deployment(
                        `${contextPath}/resources/images/${logoName}.svg`
                    )}
                    alt={altLogo}
                    className="h-24"
                />
            </Link>
        </div>
    );
}

export default Logo;
