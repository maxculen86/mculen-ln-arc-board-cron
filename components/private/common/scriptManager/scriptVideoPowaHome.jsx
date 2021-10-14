import React from 'react';
import PropTypes from 'prop-types';

const ScriptVideoPowaHome = ({ renderables, section }) => {
    const loadVideo =
        section === 'home' &&
        renderables.find(
            el =>
                el.collection === 'chains' &&
                el.props.customFields.layout === 'grillaVideo1' &&
                el.children.find(x => x.props.customFields.video)
        );

    return loadVideo ? (
        <script
            async
            src="https://lanacionar.video-player.arcpublishing.com/prod/powaBoot.js"
        />
    ) : (
        <></>
    );
};

ScriptVideoPowaHome.propTypes = {
    section: PropTypes.string.isRequired,
    renderables: PropTypes.arrayOf(
        PropTypes.shape({
            collection: PropTypes.string,
            props: PropTypes.shape({
                customFields: PropTypes.shape({
                    layout: PropTypes.string
                })
            }),
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    customFields: PropTypes.shape({
                        video: PropTypes.string
                    })
                })
            )
        })
    ).isRequired
};

export default ScriptVideoPowaHome;
