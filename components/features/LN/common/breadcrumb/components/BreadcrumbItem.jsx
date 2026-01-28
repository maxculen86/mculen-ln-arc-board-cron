import React from 'react';
import { Link } from '@ln/ds-common-link';
import Breadcrumb from '../../../../ui/ln/breadcrumb/default';
import isRecipeSection from '../helpers/isRecipeSection';
import capitalizeFirstLetter from '../../../../../private/common/utils/capitalizeFirstLetter';
import textSelector from '../../../../../private/common/utils/recetaDictionary';

export function BreadcrumbItem({
    id,
    path,
    name,
    lastLinked,
    isLastItem,
    host,
    extraOpts
}) {
    const isLastRecipeSection = isLastItem && isRecipeSection({ id, path });
    const recipeText = isLastRecipeSection
        ? capitalizeFirstLetter(textSelector(name))
        : null;
    const itemText = recipeText ?? name;
    const titleText = recipeText || `Noticias de ${name}`;
    const hrefPath = name === 'LA NACION' && path === '/' && host ? host : path;

    return (
        <Breadcrumb.Item>
            {isLastItem && !lastLinked ? (
                <span className="text-base-default text-label-md font-normal">
                    {itemText}
                </span>
            ) : (
                <Breadcrumb.Link asChild>
                    <Link
                        className="text-primary-default text-label-md font-normal"
                        href={hrefPath}
                        title={titleText}
                        {...extraOpts}
                    >
                        {itemText}
                    </Link>
                </Breadcrumb.Link>
            )}
        </Breadcrumb.Item>
    );
}
