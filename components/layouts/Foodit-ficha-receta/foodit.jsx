import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';

import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import OpeningRecipe from '../../features/foodit-global/common/OpeningRecipe/foodit';

const pageBuilderSections = [
    'Pre-titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Pos-Apertura',
    'Cuerpo',
    'Tercera',
    'Bottom'
];

const FichaRecetaFoodit = ({ children = [], globalContent = {} }) => {
    const [
        preTitle,
        title,
        oppening,
        leftBody,
        posOppening,
        body,
        third,
        bottom
    ] = children;

    return (
        <BaseLayout>
            <section>{preTitle}</section>
            <section>{title}</section>
            <OpeningRecipe article={globalContent} />
            <section>{oppening}</section>
            <section>{leftBody}</section>
            <section>{posOppening}</section>
            <section>{body}</section>
            <section>{third}</section>
            <section>{bottom}</section>
        </BaseLayout>
    );
};

FichaRecetaFoodit.sections = pageBuilderSections;

FichaRecetaFoodit.propTypes = {
    children: PropTypes.array,
    globalContent: PropTypes.object
};

export default Consumer(FichaRecetaFoodit);
