/* eslint-disable react/no-danger */

import React from 'react';
import { criticalCssPathsBySite } from './helpers';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';
import get from '../../private/common/utils/get';
import config from '../../../properties/sites/foodit';

const {
    layoutsName: {
        FooditHome,
        FooditChatIA,
        FooditFichaReceta,
        FooditFichaNota,
        FooditListadoCompras,
        FooditRecetario,
        FooditAcumulado,
        FooditMenuSemanal,
        FooditChef,
        FooditBuscador,
        Foodit404,
        FooditSubcategorias,
        FooditAcumuladoChef,
        FooditRecipePaywall,
        FooditNotePaywall
    }
} = config;

export function GetCriticalCss({ layout, Resource, globalContent }) {
    if (!Resource || typeof Resource !== 'function') {
        return null;
    }
    const listOfAllowedSection = [
        { pageLayout: FooditHome },
        { pageLayout: FooditChatIA },
        { pageLayout: FooditFichaReceta },
        { pageLayout: FooditFichaNota },
        { pageLayout: FooditListadoCompras },
        { pageLayout: FooditRecetario },
        { pageLayout: FooditAcumulado },
        { pageLayout: FooditMenuSemanal },
        { pageLayout: FooditChef },
        { pageLayout: FooditBuscador },
        { pageLayout: Foodit404 },
        { pageLayout: FooditSubcategorias },
        { pageLayout: FooditAcumuladoChef },
        { pageLayout: FooditRecipePaywall },
        { pageLayout: FooditNotePaywall }
    ];
    const shouldLoadTailwidcss = isAllowedSection({
        globalContent,
        listOfAllowedSection,
        layout
    });
    const path = get(criticalCssPathsBySite, 'foodit.default', '');

    if (!path) return null;
    return (
        <>
            <Resource path={path} encoding="utf8">
                {({ data }) =>
                    data ? (
                        <style
                            id="critical-css"
                            dangerouslySetInnerHTML={{
                                __html: data
                            }}
                        />
                    ) : null
                }
            </Resource>
            {shouldLoadTailwidcss && (
                <Resource
                    path="resources/dist/css/foodit/tailwind/global.css"
                    encoding="utf8"
                >
                    {({ data }) =>
                        data ? (
                            <style
                                id="critical-css-tailwind"
                                dangerouslySetInnerHTML={{
                                    __html: data
                                }}
                            />
                        ) : null
                    }
                </Resource>
            )}
        </>
    );
}
