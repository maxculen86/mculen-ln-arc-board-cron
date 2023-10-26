import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';

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

const FichaRecetaFoodit = ({ children }) => {
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

export default FichaRecetaFoodit;
