import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LastVideos from '../private/OTT/common/lastVideos';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

const layoutItems = ['Header', 'Apertura', 'Bloque-1', 'Bloque-2'];

const OTTHomeLayout = ({ children } = {}) => {
    const [header, opening, bloque1, bloque2] = children;

    useEffect(() => {
        loadHeaderEvents();
    }, []);

    return (
        <>
            {header}
            <div className="wrapper">
                <main className="main">
                    {opening}
                    {bloque1}
                    <LastVideos />
                    {bloque2}
                </main>
                <Footer />
            </div>
        </>
    );
};

OTTHomeLayout.sections = layoutItems;

OTTHomeLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node)
};

export default OTTHomeLayout;
