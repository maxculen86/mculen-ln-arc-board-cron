import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import LoginProvider from '../private/LN/common/context/loginContext';
import ComTitle from '../private/common/com-title';

import '../../resources/dist/css/ln/components/banners.css';
import { GlobalProviderAcu } from '../private/LN/acumulado/context/globalContextAcu';

// import withCollections from '../private/LN/acumulado/hocs/withCollections';

const pageBuilderSections = ['Sección 1'];

const LNHome = props => {
    const {
        children: [seccion1],
        outputType
    } = props;
    const amp = outputType === 'amp' ? 'amp' : '';

    return (
        <LoginProvider>
            <GlobalProviderAcu>
                {seccion1}
                <div id="wrapper" className={`home ${amp}`}>
                    <Header />
                    <main>
                        <div className="row">
                            <div className="lay">
                                <ComTitle
                                    tag="h1"
                                    size="--l"
                                    content="LAYOUT HOME"
                                />
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </GlobalProviderAcu>
        </LoginProvider>
    );
};

LNHome.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired
};

LNHome.sections = pageBuilderSections;

export default Consumer(LNHome);
