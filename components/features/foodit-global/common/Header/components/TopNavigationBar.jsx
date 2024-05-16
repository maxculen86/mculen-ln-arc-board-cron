import React from 'react';
import Static from 'fusion:static';
import { Topnavigationbar } from '@ln/foodit-ui-topnavigationbar';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';
import Categories from './menuCategories';
import StaticContent from '../../../../../private/common/staticContent';

export const TopNavigationBar = ({ categories = [] }) => {
    return (
        <div className="flex w-100 jc-between container py-12 h-44">
            <Topnavigationbar className="flex jc-center">
                {categories.map((category, i) => (
                    <Categories {...category} key={i} />
                ))}
            </Topnavigationbar>
            <Static id="foodit-top-navigation-bar">
                <Topnavigationbar className="text-12">
                    <Link
                        href="/recetario/"
                        title="Ir a mis recetas"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event-data-layer="e_linkclick"
                        data-dynamic-category="header"
                        data-dynamic-label={'Recetario'}
                        data-dynamic-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="bookmark" critical />
                        </Icon>
                        MIS RECETAS
                    </Link>
                    <Link
                        href="/lista-de-compras/"
                        title="Ir a lista de compras"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event-data-layer="e_linkclick"
                        data-dynamic-category="header"
                        data-dynamic-label={'Lista de compras'}
                        data-dynamic-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="cart" critical />
                        </Icon>
                        LISTA DE COMPRAS
                    </Link>
                    {/* TODO: descomentar cuando esten listos los newsletters de foodit */}
                    {/* <Link
                        href="https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274"
                        title="Ir a newsletter"
                        className="gap-8"
                        data-interaction="dataLayerInteraction"
                        data-event-data-layer="e_linkclick"
                        data-dynamic-category="header"
                        data-dynamic-label="newsletter"
                        data-dynamic-action="N/A"
                    >
                        <Icon size={20}>
                            <IconSprite name="newsletter" critical />
                        </Icon>
                        NEWSLETTER
                    </Link> */}
                </Topnavigationbar>
            </Static>
        </div>
    );
};
