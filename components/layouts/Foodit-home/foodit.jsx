import React, { useEffect, useState } from 'react';
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
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isAdmin) return;
        createDifferVideosObserver();
        if (document.readyState === 'complete') {
            setShowModal(true);
        } else {
            window.addEventListener('load', () => setShowModal(true), {
                once: true
            });
        }
    }, [isAdmin]);

    return (
        <BaseLayout>
            <UserBookmarks />
            {showModal && BannersFoodit.modal_1x1()}
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
