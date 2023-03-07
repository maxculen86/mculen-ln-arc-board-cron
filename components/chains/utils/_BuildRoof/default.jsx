/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Roof } from '@ln/contenidos-ui-roof';
import PropTypes from 'prop-types';
import validateRoof from './_helper/validateRoof';
import setRender from '../setRender';
import hasDataRoof from './_helper/hasDataRoof';
import { VERTICALS } from '../common/_helpers-WebApi';
import '../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';

export default function BuildRoof(props) {
    const {
        title,
        titleLink,
        logo,
        logoId,
        buttonText,
        linkButton,
        buttonStyle,
        chainStyle: chainStyleUncheked,
        hideRoof,
        links,
        navigationId,
        isAdmin
    } = props;

    const chainStyle =
        !VERTICALS.includes(chainStyleUncheked) && chainStyleUncheked;

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
        title,
        'roof-group': 'left'
    };

    const propsRight = hasDataRoof({ chainStyle }) && {
        navData: links,
        buttonType: buttonStyle || 'generico',
        textButton: buttonText,
        hrefButton: linkButton,
        'roof-group': 'right'
    };

    return setRender({
        isAdmin,
        error,
        withSection: false,
        extraOptions: {
            isEmpty: hideRoof && <></>,
            default: !hideRoof && (
                <Roof
                    roof-container="roof-container"
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
    titleLink: PropTypes.string,
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
    titleLink: '',
    buttonText: '',
    linkButton: '',
    buttonStyle: '',
    navigationId: '',
    chainStyle: 'generic'
};
