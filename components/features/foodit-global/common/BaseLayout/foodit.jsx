import React, { useEffect } from 'react';
import Static from 'fusion:static';
import { useIdleTask } from '@ln/utility-hooks';
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
import AuthInitializer from '../../../../private/common/auth/AuthInitializer';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../../private/common/auth/helper/loginHelper';
import PwaInstallPrompt from '../PWAInstallPrompt/PWAInstallPrompt';

function BaseLayout({ children }) {
    const { layout, contextPath, deployment, arcSite, siteProperties } =
        useAppContext();

    const { toggleDrawer: toggleRecetarioDrawer } = useDrawer({
        id: DRAWER.RECETARIO
    });

    const { layoutsName } = siteProperties || {};

    const classNameMain = cx('container flex flex-column gap-40', {
        'pb-64': ![
            layoutsName.FooditRecipePaywall,
            layoutsName.FooditNotePaywall
        ].includes(layout)
    });

    const wrapperClass = cx('wrapper overflow-x-clip roboto', {
        '--non-subscriber': !isSubscribed(SUBSCRIBED_HELPER.FOODIT)
    });

    const excludeLayoutsFloatingGroupButton = [layoutsName.FooditBuscador];
    const showFloatingGroupButton =
        !excludeLayoutsFloatingGroupButton.includes(layout);

    useIdleTask(() => {
        import('./fonts-deferred.scss');
    });

    useEffect(() => {
        const handleUCLReady = async () => {
            try {
                await window.UCL.GoogleOneTap();
            } catch (error) {
                console.error('Error inicializando Google One Tap:', error);
            }
        };

        window.addEventListener('ucl-ready', handleUCLReady);

        return () => {
            window.removeEventListener('ucl-ready', handleUCLReady);
        };
    }, []);

    return (
        <AuthInitializer website="foodit">
            <DynamicStylesheetLoader
                contextPath={contextPath}
                deployment={deployment}
                layout={layout}
                arcSite={arcSite}
            />
            <div className={wrapperClass}>
                <Header layout={layout} layoutsName={layoutsName} />
                <div className="header-sentinel" />
                <DrawerMyAccount arcSite={arcSite} deployment={deployment} />
                <main className={classNameMain}>{children}</main>
                <Static id="footer-static">
                    <Footer
                        contextPath={contextPath}
                        deployment={deployment}
                        layout={layout}
                        siteProperties={siteProperties}
                    />
                </Static>
                <DataLayerInteractions />
                <Modal />
                <Toasts />
                {showFloatingGroupButton && (
                    <FloatingGroupButton
                        {...getConfigByLayout(layout, [toggleRecetarioDrawer])}
                    />
                )}
                <PwaInstallPrompt
                    deployment={deployment}
                    arcSite={arcSite}
                    variant="snackBarDefault"
                />
            </div>
        </AuthInitializer>
    );
}

export default BaseLayout;
