import React from 'react';
import Header from '../header/default';
import { FooterBase } from '../footer/default';
import ToastsContainer from '../../../ui/ln/toastsContainer/default';
import InitControlGroup from '../../../../layouts/helpers/initCtrlGrp';
import LoadBannersSSR from '../../../../private/common/banners/LoadBannersSSR';
import DrawerSections from '../drawerSections/default';
import Navbar from '../navBar/default';
// TODO: Crear componente con clases del DS.
import PwaModal from '../../../LN-10-global/pwaModal/default';

import '../../../../../resources/dist/css/ln/base/helpers-migration-ds.css';

// TODO: Implementar Navbar y PwaModal con DS.
// import { Navbar } from '../navbar/default';
// import { Navbar } from '../pwaModal/default';

function BaseLayout({ children, ...props }) {
    return (
        <div {...props}>
            <div className="overflow-x-clip min-h-100dvh flex flex-column --arial">
                <Header />
                <main
                    className="container-fluid flex flex-column flex-grow-1 gap-24 ai-start"
                    id="content"
                >
                    {children}
                </main>
                <FooterBase />
                <Navbar />
                <PwaModal />
                <InitControlGroup />
                <LoadBannersSSR />

                <ToastsContainer />
                <DrawerSections />
            </div>
        </div>
    );
}

export default BaseLayout;
