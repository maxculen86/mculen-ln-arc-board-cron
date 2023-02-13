/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Roof } from '@ln/contenidos-ui-roof';
import PropTypes from 'prop-types';
import validateRoof from './_helper/validateRoof';
import useGetLinks from './_helper/useGetLinks';
import useGetLogo from './_helper/useGetLogo';
import setRender from '../setRender';
import '../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import hasDataRoof from './_helper/hasDataRoof';

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

    const propsLeft = hasDataRoof({ chainStyle }) && {
        logo,
        href: titleLink,
        text: !logo && title,
        title
    };

    const propsRight = hasDataRoof({ chainStyle }) && {
        navData: links,
        buttonType: buttonStyle || 'generico',
        textButton: buttonText,
        hrefButton: linkButton
    };

    return setRender({
        isAdmin,
        error,
        withSection: false,
        extraOptions: {
            isEmpty: hideRoof && <></>,
            default: !hideRoof && (
                <Roof
                    roofType={
                        (chainStyle && chainStyle.toLowerCase()) || 'generic'
                    }
                >
                    <Roof.Left {...propsLeft} />
                    <Roof.Right {...propsRight} />
                </Roof>
            )
        }
    });
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
