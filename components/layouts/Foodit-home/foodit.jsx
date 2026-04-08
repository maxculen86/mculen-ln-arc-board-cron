import React, { useEffect } from 'react';
import Static from 'fusion:static';
import classNames from 'classnames';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import { createDifferVideosObserver } from '../../private/common/banners/intersectionObservers';
import { BannersFoodit } from '../../features/foodit-global/Banners/foodit';
import { EjesHome } from '../../features/foodit-global/common/ejesHome/foodit';

const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2', 'Bloque-3'];

function HomeFoodit({ children, isAdmin = false }) {
    const [opening, bloque1, bloque2, bloque3] = children;
    const sectionClasses = classNames('flex flex-column gap-40');

    useEffect(() => {
        if (!isAdmin) {
            createDifferVideosObserver();
        }
    }, [isAdmin]);

    return (
        <BaseLayout>
            <UserBookmarks />
            {BannersFoodit.modal_1x1()}
            <Static id="opening-home">
                <EjesHome />
                <section>{opening}</section>
            </Static>
            <section className={sectionClasses}>{bloque1}</section>
            <section className={sectionClasses}>{bloque2}</section>
            <section className={sectionClasses}>{bloque3}</section>
        </BaseLayout>
    );
}

HomeFoodit.sections = pageBuilderSections;

export default HomeFoodit;
