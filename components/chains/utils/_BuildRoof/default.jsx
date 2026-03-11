import React from 'react';
import { useAppContext } from 'fusion:context';
import { Roof } from '@ln/contenidos-ui-roof';
import validateRoof from './_helper/validateRoof';
import setRender from '../setRender';
import hasDataRoof from './_helper/hasDataRoof';
import { CHAIN_STYLE, VERTICALS } from '../common/_helpers-WebApi';
import { getAssetsLeft, getAssetsRight } from './_helper/assets';
import { targetUrlRedirect } from '../targetUrlRedirect';

export default function BuildRoof(props) {
    const {
        title,
        titleLink = '',
        logo,
        logoId = '',
        buttonLogo = '',
        buttonText = '',
        linkButton = '',
        buttonStyle = '',
        chainStyle: chainStyleUncheked = 'generic',
        hideRoof = false,
        links,
        navigationId = '',
        isAdmin,
        isAFondo
    } = props;

    const { contextPath, deployment } = useAppContext();

    const chainStyle =
        !VERTICALS.includes(chainStyleUncheked) && chainStyleUncheked;

    const isSubExclusive = chainStyle === CHAIN_STYLE.SUB_EXCLUSIVE;

    const isFoodit = chainStyle === CHAIN_STYLE.FOODIT;
    const targetUrlSite = targetUrlRedirect(titleLink);
    const targetUrlLinkButton = targetUrlRedirect(linkButton);

    const error = validateRoof({
        chainStyle,
        logoData: logo,
        linksData: links,
        title,
        logoId,
        hideRoof,
        navigationId
    });

    const roofType =
        isAFondo || !chainStyle ? 'generic' : chainStyle.toLowerCase();

    const hideArrow = !!logo?.src;

    const propsLeft = hasDataRoof({ chainStyle }) && {
        logo,
        href: titleLink,
        target: targetUrlSite,
        text: !logo && title,
        title,
        'roof-group': 'left',
        assets: !hideArrow ? getAssetsLeft : null
    };

    const propsRight = hasDataRoof({ chainStyle }) && {
        navData: links
            ? links.map(item => ({
                  ...item,
                  target: targetUrlRedirect(item.href)
              }))
            : [],
        buttonLogo: isFoodit ? '' : buttonLogo,
        buttonType: buttonStyle || 'generico',
        textButton: buttonText,
        hrefButton: linkButton,
        targetButton: targetUrlLinkButton,
        'roof-group': 'right',
        assets: getAssetsRight
    };

    const scriptCheckSubscriptionLN = isSubExclusive && (
        <script
            async
            id="scriptCheckSubscriptionLN"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptCheckSubscriptionLN.min.js`
            )}
        />
    );

    const scriptCheckSubscriptionFoodit = isFoodit && (
        <script
            async
            id="scriptCheckSubscriptionFoodit"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptCheckSubscriptionFoodit.min.js`
            )}
        />
    );

    return setRender({
        isAdmin,
        error,
        withSection: false,
        extraOptions: {
            isEmpty: hideRoof && null,
            default: !hideRoof && (
                <>
                    <Roof roof-container="roof-container" roofType={roofType}>
                        <Roof.Left {...propsLeft} />
                        <Roof.Right {...propsRight} />
                    </Roof>
                    {scriptCheckSubscriptionLN}
                    {scriptCheckSubscriptionFoodit}
                </>
            )
        }
    });
}
