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
            <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg row-gap-40">
                <div className="col-span-8 col-span-4_md col-span-5_lg flex flex-column gap-32">
                    POWERUPS
                </div>
                <div className="col-span-1_md sm-none" />
                <div className="col-span-8 col-span-7_md col-span-10_lg flex flex-column gap-32">
                    RECETA
                    {body}
                </div>
            </section>
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
