import React from 'react';
import { Link } from '@ln/ds-common-link';
import Breadcrumb from '../../../ui/ln/breadcrumb/default';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';
import isRecipeSection from './helpers/isRecipeSection';
import textSelector from '../../../../private/common/utils/recetaDictionary';

function BreadcrumbBase(props) {
    const { sections, dataSection, lastLinked, host } = props;
    const extraOpts = dataSection
        ? {
              'data-section': dataSection,
              'data-event': 'LinkClick'
          }
        : {};

    return (
        <Breadcrumb className="--no-app">
            <Breadcrumb.List>
                {sections.map((section, i) => {
                    const isLastItem = i === sections.length - 1;
                    const isLastRecipeSection =
                        isLastItem && isRecipeSection(section);
                    const path =
                        section.name === 'LA NACION' &&
                        section.path === '/' &&
                        host
                            ? host
                            : section.path;

                    const recipeText = isLastRecipeSection
                        ? capitalizeFirstLetter(textSelector(section.name))
                        : null;

                    const itemText = recipeText ?? section.name;

                    const titleText =
                        recipeText || `Noticias de ${section.name}`;

                    return (
                        <React.Fragment key={path}>
                            {i !== 0 && (
                                <Breadcrumb.Separator className="text-base-light text-label-sm font-normal" />
                            )}
                            <Breadcrumb.Item>
                                {isLastItem && !lastLinked ? (
                                    <span className="text-base-default text-label-md font-normal">
                                        {itemText}
                                    </span>
                                ) : (
                                    <Breadcrumb.Link asChild>
                                        <Link
                                            className="text-primary-default text-label-md font-normal"
                                            href={path}
                                            title={titleText}
                                            {...extraOpts}
                                        >
                                            {itemText}
                                        </Link>
                                    </Breadcrumb.Link>
                                )}
                            </Breadcrumb.Item>
                        </React.Fragment>
                    );
                })}
            </Breadcrumb.List>
        </Breadcrumb>
    );
}

export default BreadcrumbBase;
