import React from 'react';
import Static from 'fusion:static';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import classNames from 'classnames';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';

const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

const HomeFoodit = ({ children }) => {
    const [opening, bloque1, bloque2] = children;
    const sectionClasses = classNames('flex flex-column gap-40');

    return (
        <BaseLayout>
            <UserBookmarks />
            <Static id="opening-home">
                <section>{opening}</section>
            </Static>
            <hr className="lg-none" />
            <section className={sectionClasses}>{bloque1}</section>
            <section className={sectionClasses}>{bloque2}</section>
        </BaseLayout>
    );
};

HomeFoodit.sections = pageBuilderSections;

export default HomeFoodit;
