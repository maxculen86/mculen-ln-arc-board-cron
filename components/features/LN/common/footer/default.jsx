import React from 'react';
import { useAppContext } from 'fusion:context';
import Footer from '../../../ui/ln/footer/default';
import Divider from '../../../ui/ln/divider/default';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import footerData from './data/data.json';
import { getFooterIcons } from './helpers/icons';
import { getEditionDetails } from './helpers/utils';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';
import { FooterLinksSection } from './components/FooterLinksSection';
import { FooterEditionInfo } from './components/FooterEditionInfo';
import { FooterCopyright } from './components/FooterCopyright';

export function FooterBase() {
    const { contextPath, deployment, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};
    const editionDetails = getEditionDetails();

    const isHome = layout === layoutsName.HomeLN10;
    const footerIcons = getFooterIcons(contextPath, deployment);

    return (
        <div data-tw>
            <Footer className="w-full p-16 md:p-24 xl:p-32 flex flex-col gap-32 items-stretch mb-75 xl:mb-0 max-w-1366 mx-auto">
                <div className="flex flex-col items-center gap-16 justify-center">
                    <Link
                        textDecoration="none"
                        title="Ir a la página principal"
                        href="https://www.lanacion.com.ar/"
                    >
                        <Icon width={228} height={24} size="auto">
                            {footerIcons?.laNacion}
                        </Icon>
                    </Link>
                    <Divider className="bg-neutral-200" color="custom" />
                </div>
                <FooterLinksSection
                    footerData={footerData}
                    footerIcons={footerIcons}
                />
                {isHome && (
                    <FooterEditionInfo editionDetails={editionDetails} />
                )}
                <FooterCopyright footerIcons={footerIcons} />
                <Divider className="bg-neutral-200" color="custom" />
            </Footer>
        </div>
    );
}
