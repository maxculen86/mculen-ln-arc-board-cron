/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Roof } from '@ln/contenidos-ui-roof';
import PropTypes from 'prop-types';
import validateRoof from './_helper/validateRoof';
import useGetLinks from './_helper/useGetLinks';
import useGetLogo from './_helper/useGetLogo';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import '../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import { CHAIN_STYLE } from '../_helpers';

export default function BuildRoof(props) {
    const {
        title,
        titleLink,
        logoId,
        buttonText,
        linkButton,
        buttonStyle,
        chainStyle,
        hideRoof,
        navigationId,
        isAdmin
    } = props;

    const { HASHTAG } = CHAIN_STYLE;

    const logo = useGetLogo(logoId, title);
    const links = useGetLinks({ navigationSection: navigationId });

    const error = validateRoof({
        chainStyle,
        logoData: logo,
        linksData: links,
        title,
        logoId,
        hideRoof,
        navigationId,
        buttonText,
        linkButton
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    const propsLeft = chainStyle !== HASHTAG && {
        logo,
        href: titleLink,
        text: !logo && title,
        title
    };

    const propsRight = chainStyle !== HASHTAG && {
        navData: links,
        buttonType: buttonStyle || 'generico',
        textButton: buttonText,
        hrefButton: linkButton
    };
    return (
        <>
            {!hideRoof && (
                <Roof roofType={chainStyle.toLowerCase() || 'generic'}>
                    <Roof.Left {...propsLeft} />
                    <Roof.Right {...propsRight} />
                </Roof>
            )}
        </>
    );
}

BuildRoof.propTypes = {
    hideRoof: PropTypes.bool,
    title: PropTypes.string.isRequired,
    titleLink: PropTypes.string.isRequired,
    logoId: PropTypes.string,
    buttonText: PropTypes.string,
    linkButton: PropTypes.string,
    buttonStyle: PropTypes.string,
    navigationId: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    chainStyle: PropTypes.string
};

BuildRoof.defaultProps = {
    hideRoof: false,
    logoId: '',
    buttonText: '',
    linkButton: '',
    buttonStyle: '',
    navigationId: '',
    chainStyle: 'generic'
};
