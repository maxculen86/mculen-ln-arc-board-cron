import React from 'react';
import capitalizeFirstLetter from '../../../../../private/common/utils/capitalizeFirstLetter';
import textSelector from '../../../../../private/common/utils/recetaDictionary';
import isRecipeSection from './isRecipeSection';

// TODO para front: realizar ajustes de estilos segun diseño
const mapSectionsToLinks = (sections, extraOpts, host) =>
    sections.map((section, i) => {
        const path =
            section.name === 'LA NACION' && section.path === '/' && host
                ? host
                : section.path;
        return (
            <a
                className="com-link --fourxs"
                key={path}
                href={`${path}/`}
                title={
                    i + 1 === sections.length && isRecipeSection(section)
                        ? capitalizeFirstLetter(textSelector(section.name))
                        : `Noticias de ${section.name}`
                }
                {...extraOpts}
            >
                <i className="--bullet --fourxs">{`>`}</i>
                {i + 1 === sections.length && isRecipeSection(section)
                    ? capitalizeFirstLetter(textSelector(section.name))
                    : section.name}
            </a>
        );
    });

export default mapSectionsToLinks;
