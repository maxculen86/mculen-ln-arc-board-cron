import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import classNames from 'classnames';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { UserBookmarks } from '../../features/foodit-global/common/bookmark/components/UserBookmarks';
import { createDifferVideosObserver } from '../../private/common/banners/intersectionObservers';
import { BannersFoodit } from '../../features/foodit-global/Banners/foodit';
import { EjesHome } from '../../features/foodit-global/common/ejesHome/foodit';

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
            {BannersFoodit.modal_1x1()}
            <Static id="opening-home">
                <EjesHome />
                <section>{opening}</section>
            </Static>
            <section className={sectionClasses}>{bloque1}</section>
            <section className={sectionClasses}>{bloque2}</section>
        </BaseLayout>
    );
}

HomeFoodit.sections = pageBuilderSections;

HomeFoodit.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool
};

HomeFoodit.defaultProps = {
    isAdmin: false
};

export default HomeFoodit;
