/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/hour.css';

const section = ['Sección Apertura', 'Sección Caja de Tema'];
const LNHomeLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                <div id="content-main" className="lay-sidebar">
                    <div className="row">
                        {children[0]}
                        {children[1]}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

LNHomeLayout.sections = section;

export default LNHomeLayout;
