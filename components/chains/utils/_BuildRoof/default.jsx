/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { Roof } from '@ln/contenidos-ui-roof';
import PropTypes from 'prop-types';
import validateRoof from './_helper/validateRoof';
import setRender from '../setRender';
import hasDataRoof from './_helper/hasDataRoof';
import { CHAIN_STYLE, VERTICALS } from '../common/_helpers-WebApi';

export default function BuildRoof(props) {
    const {
        title,
        titleLink,
        logo,
        logoId,
        buttonLogo,
        buttonText,
        linkButton,
        buttonStyle,
        chainStyle: chainStyleUncheked,
        hideRoof,
        links,
        navigationId,
        isAdmin,
        isAFondo
    } = props;

    const { contextPath, deployment } = useAppContext();

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

    const roofType =
        isAFondo || !chainStyle ? 'generic' : chainStyle.toLowerCase();

    const propsLeft = hasDataRoof({ chainStyle }) && {
        logo,
        href: titleLink,
        text: !logo && title,
        title,
        'roof-group': 'left'
    };

    const propsRight = hasDataRoof({ chainStyle }) && {
        navData: links,
        buttonLogo,
        buttonType: buttonStyle || 'generico',
        textButton: buttonText,
        hrefButton: linkButton,
        'roof-group': 'right'
    };
    const isSubExclusive = chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE;

    const scriptBtnSuscription = isSubExclusive ? (
        <script
            async
            id="scriptBtnSuscriptionRoof"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptBuildRoof.min.js`
            )}
        />
    ) : (
        <></>
    );

    return setRender({
        isAdmin,
        error,
        withSection: false,
        extraOptions: {
            isEmpty: hideRoof && <></>,
            default: !hideRoof && (
                <>
                    <Roof roof-container="roof-container" roofType={roofType}>
                        <Roof.Left {...propsLeft} />
                        <Roof.Right {...propsRight} />
                    </Roof>
                    {scriptBtnSuscription}
                </>
            )
        }
    });
}

BuildRoof.propTypes = {
    hideRoof: PropTypes.bool,
    title: PropTypes.string.isRequired,
    titleLink: PropTypes.string,
    logoId: PropTypes.string,
    buttonLogo: PropTypes.string,
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
    buttonLogo: '',
    buttonText: '',
    linkButton: '',
    buttonStyle: '',
    navigationId: '',
    chainStyle: 'generic'
};
