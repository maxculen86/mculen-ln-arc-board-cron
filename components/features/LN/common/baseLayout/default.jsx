import React from 'react';
import Header from '../header/default';
import { FooterBase } from '../footer/default';
import ToastsContainer from '../../../ui/ln/toastsContainer/default';
import InitControlGroup from '../../../../layouts/helpers/initCtrlGrp';
import LoadBannersSSR from '../../../../private/common/banners/LoadBannersSSR';
import DrawerSections from '../drawerSections/default';
import Navbar from '../navBar/default';

// TODO: Implementar Navbar y PwaModal con DS.
// import { Navbar } from '../navbar/default';
// import { Navbar } from '../pwaModal/default';

function BaseLayout({ children, ...props }) {
    return (
        <div {...props} data-tw>
            {/* data-tw es para aplicar estilos de tailwind, quitar al finalizar la migracion al DS */}
            <div className="overflow-x-clip min-h-dvh flex flex-col text-base-default font-secondary">
                <Header />
                <main
                    className="container-fluid flex flex-col grow gap-24 items-start"
                    id="content"
                >
                    {children}
                </main>
                <FooterBase />
                <Navbar />
                {/* <PwaModal /> */}
                <InitControlGroup />
                <LoadBannersSSR />

                <ToastsContainer />
                <DrawerSections />
            </div>
        </div>
    );
}

export default BaseLayout;
