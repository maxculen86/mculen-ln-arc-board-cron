import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import { dictionaryAlt } from '../../../../private/common/utils/sectionUtils';
import { isInvalidLogo } from '../_utils/helper';

function Logo({ logoData }) {
    const { deployment, contextPath } = useAppContext();
    if (isInvalidLogo(logoData)) return null;

    const { path, logoName } = logoData;
    const link = path ? `${path}/` : null;

    const altLogo = dictionaryAlt?.[logoName] || logoName;

    return (
        <div className="logo-nota-footer as-start as-center_m">
            <Link href={link} title={altLogo}>
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

Logo.propTypes = {
    logoData: PropTypes.shape({
        path: PropTypes.string,
        logoName: PropTypes.string
    }).isRequired
};

export default Logo;
