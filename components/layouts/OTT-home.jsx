import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { urlLiveVideo } from '../private/OTT/home/OTTHomeIndex';
import VideoOpening from '../private/OTT/home/videoOpening';
import VideoOpeningTitle from '../private/OTT/home/videoOpeningTitle';
import LastVideos from '../private/OTT/common/lastVideos';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

const OTTHomeLayout = ({ children }) => {
    useEffect(() => {
        loadHeaderEvents();
    }, []);

    return (
        <>
            {children[0]}
            <div className="wrapper">
                <main className="main">
                    <VideoOpening source={urlLiveVideo} />
                    <VideoOpeningTitle title="LN+ En Vivo" />
                    {children[1]}
                    <LastVideos />
                    {children[2]}
                    <Footer />
                </main>
            </div>
        </>
    );
};

OTTHomeLayout.sections = layoutItems;

OTTHomeLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node)
};

export default OTTHomeLayout;
