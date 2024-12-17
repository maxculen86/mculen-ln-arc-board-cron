import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import { useDrawer } from '@ln/common-ui-drawer';
import { cx } from '@ln/cva';
import { getConfigByLayout } from '../floatingGroupButton/helpers';
import { DRAWER } from '../DrawerContainer/constants';
import Header from '../Header/foodit';
import Footer from '../Footer/foodit';
import Modal from '../Modals/SaveRecipe/foodit';
import DrawerMyAccount from '../DrawerMyAccount/foodit';
import FloatingGroupButton from '../floatingGroupButton/foodit';
import Toasts from '../toasts/foodit';
import DynamicStylesheetLoader from '../../../../output-types/criticalCss/dynamicStylesheetLoader';
import DataLayerInteractions from '../../../../private/common/scriptManager/DataLayerInteracions';
import AuthInitializer from '../../../../../auth/AuthInitializer';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../../auth/helper/loginHelper';

function BaseLayout({ children }) {
    const { layout, contextPath, deployment, arcSite, siteProperties } =
        useAppContext();

    const { toggleDrawer: toggleRecetarioDrawer } = useDrawer({
        id: DRAWER.RECETARIO
    });

    const { toggleDrawer: toggleBuscadorDrawer } = useDrawer({
        id: DRAWER.BUSCADOR
    });

    const { layoutsName } = siteProperties || {};

    const classNameMain = cx('container flex flex-column gap-40', {
        'pb-64': !(layoutsName.FooditRecipePaywall === layout)
    });

    const wrapperClass = cx('wrapper overflow-x-clip roboto', {
        '--non-subscriber': !isSubscribed(SUBSCRIBED_HELPER.FOODIT)
    });

    return (
        <AuthInitializer>
            <DynamicStylesheetLoader
                contextPath={contextPath}
                deployment={deployment}
                layout={layout}
                arcSite={arcSite}
            />
            <div className={wrapperClass}>
                <Header layout={layout} layoutsName={layoutsName} />
                <div className="header-sentinel" />
                <DrawerMyAccount />
                <main className={classNameMain}>{children}</main>
                <Static id="footer-static">
                    <Footer />
                </Static>
                <DataLayerInteractions />
                <Modal />
                <Toasts />
                <FloatingGroupButton
                    {...getConfigByLayout(layout, [
                        toggleRecetarioDrawer,
                        toggleBuscadorDrawer
                    ])}
                />
            </div>
        </AuthInitializer>
    );
}

BaseLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default BaseLayout;
