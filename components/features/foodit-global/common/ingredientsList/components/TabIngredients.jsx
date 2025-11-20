import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { SITE_FOODIT } from 'fusion:environment';
import { CommonTabs as Tabs } from '@ln/common-ui-tabs';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { IngredientsList } from '../foodit';
import MapperIngredientList from './MapperIngredientList';
import { copyListToClipboard } from '../../shoppingList/_helpers';
import { groupRecipeIngredients } from '../../shoppingList/groupRecipeIngredients';
import FloatingButtons from '../../floatingGroupButton/foodit';
import { getCustomConfigByLayout } from '../../floatingGroupButton/helpers';

const LISTA_DE_COMPRAS = {
    LISTA_DE_COMPRAS_POR_RECETA: 'lista-de-compras-por-receta',
    LISTA_DE_COMPRAS_POR_INGREDIENTES: 'lista-de-compras-por-ingredientes'
};

function TabIngredients({ list = [], setShoppingList = () => null }) {
    const [selectedTab, setSelectedTab] = useState(
        LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_RECETA
    );

    const { layout } = useAppContext();

    const formattedListForRecipeTab = () => {
        const formattedListForRecipeTabArray = [];

        list.forEach(({ sections, text: title, canonicalUrl }, index) => {
            if (index > 0) {
                formattedListForRecipeTabArray.push('');
            }

            formattedListForRecipeTabArray.push(title);

            sections.forEach(({ items, titleList }) => {
                if (titleList) {
                    formattedListForRecipeTabArray.push(`    ${titleList}`);
                }

                items.forEach(({ fullIngredientString }) => {
                    formattedListForRecipeTabArray.push(
                        `    - ${fullIngredientString}`
                    );
                });
            });

            if (canonicalUrl) {
                const fullUrl = `${SITE_FOODIT}${canonicalUrl}`;
                formattedListForRecipeTabArray.push('Ver receta completa:');
                formattedListForRecipeTabArray.push(fullUrl);
            }
        });

        return formattedListForRecipeTabArray;
    };

    const textToCopyInRecipeTab = formattedListForRecipeTab().join('\n');
    const allSections = list.flatMap(recipe => recipe.sections);
    const formattedListForIngredientsTab = groupRecipeIngredients(allSections);
    const textToCopyInIngredientsTab = formattedListForIngredientsTab
        .map(({ fullIngredientNameToCopy }) => fullIngredientNameToCopy.trim())
        .join('\n');

    const ingredientsListItems = allSections.map(
        ({ items, typeList, titleList }) => ({
            items,
            typeList,
            titleList
        })
    );

    const tabsConfig = [
        {
            id: LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_RECETA,
            title: 'por receta',
            callback: () =>
                setSelectedTab(LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_RECETA),
            panelContent: (
                <IngredientsList
                    list={list}
                    setShoppingList={setShoppingList}
                />
            )
        },
        {
            id: LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_INGREDIENTES,
            title: 'por ingredientes',
            callback: () =>
                setSelectedTab(
                    LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_INGREDIENTES
                ),
            panelContent: (
                <MapperIngredientList
                    list={ingredientsListItems}
                    isTabIngredients
                />
            )
        }
    ];

    const titleButton =
        selectedTab === LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_RECETA
            ? 'COPIAR RECETAS'
            : 'COPIAR INGREDIENTES';

    const textToCopy = () => {
        if (selectedTab === LISTA_DE_COMPRAS.LISTA_DE_COMPRAS_POR_RECETA) {
            copyListToClipboard(textToCopyInRecipeTab);
        } else {
            copyListToClipboard(textToCopyInIngredientsTab);
        }
    };

    return (
        <div>
            <Tabs
                selectedColor="var(--secondary-positive)"
                defaultValue={tabsConfig[0].id}
            >
                <Tabs.ItemContainer className="gap-16">
                    {tabsConfig?.map(({ id, title, callback }) => (
                        <Tabs.Item
                            className="flex ai-center mb-8 text-wrap cursor-pointer"
                            id={id}
                            key={id}
                            color="text-secondary-positive"
                            onClick={callback}
                        >
                            <Text
                                as="h2"
                                className="roboto roboto-bold uppercase text-accent-lechuga__hover"
                            >
                                {title}
                            </Text>
                        </Tabs.Item>
                    ))}
                </Tabs.ItemContainer>
                {tabsConfig?.map(({ id, panelContent }) => (
                    <Tabs.Panel className="w-100" id={id} key={id}>
                        {panelContent}
                    </Tabs.Panel>
                ))}
            </Tabs>
            <div className="sm-none absolute top-100px right-0">
                <Button
                    className="uppercase"
                    title="copiar"
                    variant="primary"
                    onClick={textToCopy}
                >
                    <Icon size={16}>
                        <IconSprite name="copy" />
                    </Icon>
                    {titleButton}
                </Button>
            </div>
            <FloatingButtons
                {...getCustomConfigByLayout(layout, titleButton, [
                    () => textToCopy()
                ])}
            />
        </div>
    );
}

TabIngredients.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            canonicalUrl: PropTypes.string,
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    typeList: PropTypes.string.isRequired,
                    items: PropTypes.arrayOf(
                        PropTypes.shape({
                            isMainIngredient: PropTypes.bool.isRequired,
                            amount: PropTypes.string,
                            unit: PropTypes.string.isRequired,
                            ingredient: PropTypes.string.isRequired,
                            abbreviation: PropTypes.string,
                            fullIngredientString: PropTypes.string.isRequired,
                            includeInShoppingList: PropTypes.bool.isRequired
                        })
                    ).isRequired,
                    titleList: PropTypes.string
                })
            ).isRequired
        })
    ).isRequired,
    setShoppingList: PropTypes.func.isRequired,
    shoppingList: PropTypes.arrayOf(
        PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    typeList: PropTypes.string.isRequired,
                    items: PropTypes.arrayOf(
                        PropTypes.shape({
                            fullIngredientString: PropTypes.string.isRequired,
                            ingredient: PropTypes.string.isRequired,
                            isMainIngredient: PropTypes.bool,
                            amount: PropTypes.string,
                            unit: PropTypes.string,
                            abbreviation: PropTypes.string,
                            includeInShoppingList: PropTypes.bool
                        })
                    ).isRequired,
                    titleList: PropTypes.string
                })
            ).isRequired,
            text: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            bookmarkId: PropTypes.string.isRequired
        })
    )
};

TabIngredients.defaultProps = {
    shoppingList: [
        {
            sections: [
                {
                    typeList: '',
                    items: [
                        {
                            fullIngredientString: '',
                            ingredient: '',
                            isMainIngredient: false,
                            amount: '',
                            unit: '',
                            abbreviation: '',
                            includeInShoppingList: false
                        }
                    ],
                    titleList: ''
                }
            ],
            text: '',
            id: '',
            bookmarkId: ''
        }
    ]
};

export default TabIngredients;
