import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import classNames from 'classnames';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import { HomeSchema } from '../../features/foodit-global/schemas/Home';
import StaticContent from '../../private/common/staticContent';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

const HomeFoodit = ({ children }) => {
    const [opening, bloque1, bloque2] = children;
    const sectionClasses = classNames('flex flex-column gap-40');

    return (
        <BaseLayout>
            <HomeSchema />
            <UserBookmarks />
            <StaticContent>
                <section>{opening}</section>
            </StaticContent>
            <hr className="lg-none" />
            <section className={sectionClasses}>{bloque1}</section>
            <section className={sectionClasses}>{bloque2}</section>
        </BaseLayout>
    );
};

HomeFoodit.sections = pageBuilderSections;

export default HomeFoodit;
