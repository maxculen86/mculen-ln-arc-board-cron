import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

// TODO: Layout base, ira cambiando segun vaya avanzando el layout final
const HomeFoodit = ({ children }) => {
    const [opening, bloque1, bloque2] = children;

    return (
        <BaseLayout>
            <section className="pt-8 mb-64">
                <h1 className="prumo text-32 prumo-extrabold mb-16">
                    Home recetas
                </h1>
                {opening}
            </section>
            <section className="mb-64">
                <h2 className="prumo text-32 prumo-medium mb-16">Bloque 1</h2>
                {bloque1}
            </section>
            <section className="mb-64">
                <h2 className="prumo text-32 prumo-light mb-16">Bloque 2</h2>
                {bloque2}
            </section>
        </BaseLayout>
    );
};

HomeFoodit.sections = pageBuilderSections;

export default HomeFoodit;
