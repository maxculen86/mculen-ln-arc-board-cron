import React from 'react';
import { useAppContext } from 'fusion:context';
import Footer from '../../../ui/ln/footer/default';
import Divider from '../../../ui/ln/divider/default';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import linksData from './data/linksData.json';
import socialNetworksData from './data/socialNetworksData.json';
import { getFooterImages } from './helpers/images';
import { getEditionDetails } from './helpers/utils';
import { FooterLinksSection } from './components/FooterLinksSection';
import { FooterEditionInfo } from './components/FooterEditionInfo';
import { FooterCopyright } from './components/FooterCopyright';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';

export function FooterBase() {
    const { contextPath, deployment, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};
    const editionDetails = getEditionDetails();

    const isHome = layout === layoutsName.HomeLN10;
    const footerImages = getFooterImages(contextPath, deployment);

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
                            {footerImages?.laNacion}
                        </Icon>
                    </Link>
                    <Divider className="bg-neutral-200" color="custom" />
                </div>
                <FooterLinksSection
                    linksData={linksData}
                    socialNetworksData={socialNetworksData}
                    footerImages={footerImages}
                />
                {isHome && (
                    <FooterEditionInfo editionDetails={editionDetails} />
                )}
                <FooterCopyright
                    footerImages={footerImages}
                    year={editionDetails.edDate.year}
                />
                <Divider className="bg-neutral-200" color="custom" />
            </Footer>
        </div>
    );
}
