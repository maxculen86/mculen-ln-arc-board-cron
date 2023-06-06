/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Webstories } from '@ln/contenidos-ui-webstories';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import {
    validateChain,
    filterWebStoriesChildren,
    filterWebStories
} from './common/_helper-WebApi';
import '../../../resources/packages/css/@ln/contenidos-ui-webstories/index.css';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

const CajaWebStories = props => {
    const {
        id: chainId,
        children,
        renderables = [],
        isAdmin,
        customFields
    } = props;

    const { position, positionInsideSection } = getCommonProps(props);

    const { hideCaja = false } = customFields;

    const filteredChildren = filterWebStoriesChildren(
        filterWebStories(renderables),
        children
    );

    const { bannerMob = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        'WebStories',
        '',
        position,
        '',
        positionInsideSection
    );

    const error = validateChain(filteredChildren);

    return (
        !hideCaja && (
            <>
                <div data-module={extraOptsDiv['data-module']}>
                    <section
                        data-block-name={extraOpts['data-block-name']}
                        data-diagramacion-id={extraOpts['data-diagramacion-id']}
                        data-is-block={extraOpts['data-is-block']}
                    >
                        <Webstories>{filteredChildren}</Webstories>
                    </section>
                    {bannerMob}
                </div>
                {isAdmin && error && error.message && (
                    <WarningMessage type={error.type} message={error.message} />
                )}
            </>
        )
    );
};

CajaWebStories.label = 'LN10 Caja WebStories';

CajaWebStories.propTypes = {
    customFields: PropTypes.shape({
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            group: 'Ajuste Web Stories',
            hidden: false
        })
    })
};

export default Consumer(CajaWebStories);
