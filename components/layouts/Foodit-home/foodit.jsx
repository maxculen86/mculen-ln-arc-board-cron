import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import classNames from 'classnames';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import { createDifferVideosObserver } from '../../private/common/banners/intersectionObservers';

const pageBuilderSections = ['Apertura', 'Bloque-1', 'Bloque-2'];

function HomeFoodit({ children, isAdmin }) {
    const [opening, bloque1, bloque2] = children;
    const sectionClasses = classNames('flex flex-column gap-40');

    useEffect(() => {
        if (!isAdmin) {
            createDifferVideosObserver();
        }
    }, [isAdmin]);

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
}

HomeFoodit.sections = pageBuilderSections;

HomeFoodit.propTypes = {
    children: PropTypes.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default HomeFoodit;
