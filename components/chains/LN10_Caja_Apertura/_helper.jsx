import React from 'react';

export const setFeaturedChildren = (renderables = [], features = []) => {
    const customWrappers = {
        'LN-acumulado/timeline': content => (
            <div className="timeline-home">
                <div className="timeline-content">{content}</div>
            </div>
        )
    };

    return renderables.map(({ type, props } = {}) => {
        const feature = features.find(c => c.key === props.id);
        return customWrappers[type] ? customWrappers[type](feature) : feature;
    });
};

export const setFilteredRenderables = (renderables = [], features = []) => {
    const featuresKeys = features.map(c => c.key);
    return renderables.filter(f => featuresKeys.includes(f.props.id));
};
