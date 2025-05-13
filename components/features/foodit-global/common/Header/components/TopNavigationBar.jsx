import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { Topnavigationbar } from '@ln/foodit-ui-topnavigationbar';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import Categories from './menuCategories';

export function TopNavigationBar({ categories = [] }) {
    return (
        <div className="flex w-100 jc-between container py-12 h-44">
            <Topnavigationbar className="flex jc-center">
                {categories.map(category => (
                    <Categories {...category} key={category.title} />
                ))}
            </Topnavigationbar>
            <Static id="foodit-top-navigation-bar">
                <Topnavigationbar className="text-12">
                    <Link
                        data-test-id="header-link-recetario"
                        href="/recetario/"
                        title="Ir a mis recetas"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event="e_linkclick"
                        data-category="header"
                        data-label="Recetario"
                        data-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="bookmark" critical />
                        </Icon>
                        MIS RECETAS
                    </Link>
                    <Link
                        href="/mi-menu-semanal/"
                        title="Ir a mi menú semanal"
                        className="gap-8"
                    >
                        <Icon size={20}>
                            <IconSprite name="weekly-menu" critical />
                        </Icon>
                        MI MENÚ SEMANAL
                    </Link>
                    <Link
                        data-test-id="header-link-lista-compras"
                        href="/lista-de-compras/"
                        title="Ir a lista de compras"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event="e_linkclick"
                        data-category="header"
                        data-label="Lista de compras"
                        data-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="shopping-list" critical />
                        </Icon>
                        LISTA DE COMPRAS
                    </Link>
                    <Link
                        data-test-id="header-link-newsletter"
                        href="https://newsletter.lanacion.com.ar/#foodit"
                        title="Ir a newsletter"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event="e_linkclick"
                        data-category="header"
                        data-label="newsletter"
                        data-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="newsletter" critical />
                        </Icon>
                        NEWSLETTER
                    </Link>
                </Topnavigationbar>
            </Static>
        </div>
    );
}

TopNavigationBar.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.shape({
                        text: PropTypes.string.isRequired,
                        href: PropTypes.string,
                        icon: PropTypes.shape({
                            props: PropTypes.shape({
                                name: PropTypes.string.isRequired
                            })
                        })
                    }),
                    items: PropTypes.arrayOf(
                        PropTypes.shape({
                            text: PropTypes.string.isRequired,
                            href: PropTypes.string.isRequired
                        })
                    )
                })
            )
        })
    ).isRequired
};
