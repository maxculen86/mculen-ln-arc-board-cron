import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Link } from '@ln/contenidos-ui-link';
import {
    dictionaryAlt,
    getSectionLogo
} from '../../../../private/common/utils/sectionUtils';

function Logo({ globalContent, layout }) {
    const {
        taxonomy: { sections },
        distributor
    } = globalContent;

    const { deployment, contextPath } = useAppContext();

    const { name } = distributor || {};
    const logo = getSectionLogo(sections, layout, name);

    if (!logo || !logo.logoName || logo.logoName === 'canchallena') return null;

    const { path, logoName } = logo;
    const link = path ? `${path}/` : null;

    const altLogo = dictionaryAlt?.[logoName] || logoName;

    return (
        <Link href={link} title={altLogo}>
            <Adaptableimage
                src={deployment(
                    `${contextPath}/resources/images/${logoName}.svg`
                )}
                alt={altLogo}
                classCondition="ln-nota-logo"
            />
        </Link>
    );
}

Logo.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string,
            category: PropTypes.string
        }),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        })
    }),
    layout: PropTypes.string
};

Logo.defaultProps = {
    globalContent: null,
    layout: ''
};

export default Logo;
