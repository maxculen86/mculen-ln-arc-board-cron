import React from 'react';
import PropTypes from 'prop-types';

import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import OpeningStorytelling from '../../features/foodit-global/common/OpeningStorytelling/foodit';
import StaticContent from '../../private/common/staticContent';

const pageBuilderSections = [
    'Pre-titulo',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Bottom'
];

const FichaNotaFoodit = ({ children = [], globalContent = {} }) => {
    const [preTitle, leftBody, body, third, bottom] = children;
    const { promo_items } = globalContent;
    const video = Boolean(promo_items && promo_items.video_jw);

    return (
        <BaseLayout>
            <section>{preTitle}</section>
            {video ? (
                <OpeningStorytelling article={globalContent} />
            ) : (
                <StaticContent>
                    <OpeningStorytelling article={globalContent} />
                </StaticContent>
            )}
            <section>{leftBody}</section>
            <section>{body}</section>
            <section>{third}</section>
            <section>{bottom}</section>
        </BaseLayout>
    );
};

FichaNotaFoodit.sections = pageBuilderSections;

FichaNotaFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FichaNotaFoodit);
