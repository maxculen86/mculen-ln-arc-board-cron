import React from 'react';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

// TODO: Layout base, ira cambiando segun vaya avanzando el layout final
const LNHomeRecetas = ({ children }) => {
    const [opening, bloque1, bloque2] = children;

    return (
        <div>
            <div>
                <h1>Header Recetas</h1>
            </div>
            <main>
                <section>
                    <h1>Apertura / receta del dia</h1>
                    {opening}
                </section>
                <section>
                    <h1>Bloque 1</h1>
                    {bloque1}
                </section>
                <section>
                    <h1>Bloque 2</h1>
                    {bloque2}
                </section>
            </main>
        </div>
    );
};

LNHomeRecetas.sections = pageBuilderSections;

export default LNHomeRecetas;
