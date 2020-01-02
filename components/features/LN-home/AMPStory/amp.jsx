import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';

import '../../../../resources/dist/css/ln/amp/amp-story.css';

// TODO: Armar la siguiente lista en archivos de constantes AMP
const AmpStory = 'amp-story';
const AmpStoryPage = 'amp-story-page';
const AmpStoryGridLayer = 'amp-story-grid-layer';
const AmpImg = 'amp-img';
const AmpVideo = 'amp-video';

const _getAssetsPath = contextPath => deployment => assets => {
    const path = `${contextPath}/resources/amp/assets`;
    return `${deployment(`${path}/${assets}`)}`;
};

const amp = props => {
    const { contextPath, deployment } = props;
    const getAssets = _getAssetsPath(contextPath)(deployment);

    return (
        <AmpStory
            standalone=""
            title="Joy of Pets"
            publisher="AMP tutorials"
            publisher-logo-src={getAssets('AMP-Brand-White-Icon.svg')}
            poster-portrait-src={getAssets('cover.jpg')}
        >
            <AmpStoryPage id="cover" auto-advance-after="2s">
                <AmpStoryGridLayer template="fill">
                    <AmpImg
                        src={getAssets('cover.jpg')}
                        width="720"
                        height="1280"
                        layout="responsive"
                    />
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical">
                    <h1>The Joy of Pets</h1>
                    <p>By AMP Tutorials</p>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <AmpStoryPage id="page1" auto-advance-after="2s">
                <AmpStoryGridLayer template="vertical">
                    <h1>Cats</h1>
                    <AmpImg
                        src={getAssets('cat.jpg')}
                        width="720"
                        height="1280"
                        layout="responsive"
                    />
                    <q>
                        Dogs come when they're called. Cats take a message and
                        get back to you. --Mary Bly
                    </q>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <AmpStoryPage id="page2" auto-advance-after="2s">
                <AmpStoryGridLayer template="fill">
                    <AmpImg
                        src={getAssets('dog.jpg')}
                        width="720"
                        height="1280"
                        layout="responsive"
                    />
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="thirds">
                    <h1 grid-area="upper-third">Dogs</h1>
                    <p grid-area="lower-third">
                        Dogs were probably the first tame animals. They have
                        accompanied humans for some 10,000 years. Some
                        scientists assert that all dogs, domestic and wild,
                        share a common ancestor in the small South Asian wolf.
                    </p>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <AmpStoryPage
                id="page3"
                background-audio={getAssets('bird-singing.mp3')}
                auto-advance-after="2s"
            >
                <AmpStoryGridLayer template="fill">
                    <AmpImg
                        src={getAssets('bird.jpg')}
                        width="720"
                        height="1280"
                        layout="responsive"
                    />
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical">
                    <h1>Birds</h1>
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical" class="bottom">
                    <q>
                        A bird is three things: Feathers, flight and song, And
                        feathers are the least of these. -Marjorie Allen
                        Seiffert
                    </q>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <AmpStoryPage id="page4" auto-advance-after="2s">
                <AmpStoryGridLayer template="fill">
                    <AmpVideo
                        autoplay=""
                        loop=""
                        width="720"
                        height="1280"
                        poster={getAssets('rabbit.jpg')}
                        layout="responsive"
                    >
                        <source
                            src={getAssets('rabbit.mp4')}
                            type="video/mp4"
                        />
                    </AmpVideo>
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical">
                    <h1>Rabbits</h1>
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical" class="bottom">
                    <p>
                        Rabbits can learn to follow simple voice commands and
                        come when called by name, and are curious and playful.
                    </p>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <AmpStoryPage id="page5">
                <AmpStoryGridLayer template="vertical" class="noedge">
                    <div className="wrapper">
                        <AmpImg
                            src={getAssets('cat.jpg')}
                            width="720"
                            height="1280"
                            layout="responsive"
                            animate-in="fade-in"
                            animate-in-delay="0.4s"
                        />
                        <AmpImg
                            src={getAssets('dog.jpg')}
                            width="720"
                            height="1280"
                            layout="responsive"
                            animate-in="fade-in"
                            animate-in-delay="0.6s"
                        />
                        <AmpImg
                            src={getAssets('bird.jpg')}
                            width="720"
                            height="1280"
                            layout="responsive"
                            animate-in="fade-in"
                            animate-in-delay=".8s"
                        />
                        <AmpImg
                            src={getAssets('rabbit.jpg')}
                            width="720"
                            height="1280"
                            layout="responsive"
                            animate-in="fade-in"
                            animate-in-delay="1s"
                        />
                    </div>
                </AmpStoryGridLayer>
                <AmpStoryGridLayer template="vertical" class="center-text">
                    <p className="banner-text" animate-in="whoosh-in-right">
                        Pets can lower your stress levels!
                    </p>
                </AmpStoryGridLayer>
            </AmpStoryPage>
            <amp-story-bookend
                src={getAssets('bookend.json')}
                layout="nodisplay"
            />
        </AmpStory>
    );
};

amp.propTypes = {
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Context(amp);
