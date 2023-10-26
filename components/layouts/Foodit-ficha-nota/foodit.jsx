import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';

const pageBuilderSections = [
    'Pre-titulo',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Bottom'
];

const FichaNotaFoodit = ({ children }) => {
    const [preTitle, leftBody, body, third, bottom] = children;

    return (
        <BaseLayout>
            <section>{preTitle}</section>
            <section>{leftBody}</section>
            <section>{body}</section>
            <section>{third}</section>
            <section>{bottom}</section>
        </BaseLayout>
    );
};

FichaNotaFoodit.sections = pageBuilderSections;

export default FichaNotaFoodit;
