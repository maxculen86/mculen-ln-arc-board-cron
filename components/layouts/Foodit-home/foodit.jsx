import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import classNames from 'classnames';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

// TODO: Layout base, ira cambiando segun vaya avanzando el layout final
const HomeFoodit = ({ children }) => {
    const [opening, bloque1, bloque2] = children;
    const sectionClasses = classNames('flex flex-column gap-72');

    return (
        <BaseLayout>
            <section>{opening}</section>
            <section className={sectionClasses}>{bloque1}</section>
            <section className={sectionClasses}>{bloque2}</section>
        </BaseLayout>
    );
};

HomeFoodit.sections = pageBuilderSections;

export default HomeFoodit;
