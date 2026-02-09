import React from 'react';
import capitalizeFirstLetter from '../../common/utils/capitalizeFirstLetter';
import textSelector from '../../common/utils/recetaDictionary';
import '../../../../resources/dist/css/ln/components/breadcrumb.css';

const getListSections = (sections, extraOpts, host, colorCategory) =>
    sections.map((section, i) => {
        const { id = '', path: sectionPath = '' } = section;
        const path =
            section.name === 'LA NACION' && section.path === '/' && host
                ? host
                : section.path;
        const isRecipe =
            id.includes('/recetas') || sectionPath.includes('/recetas');
        return (
            <a
                className="com-link --fourxs"
                key={path}
                href={`${path}/`}
                title={
                    i + 1 === sections.length && isRecipe
                        ? capitalizeFirstLetter(textSelector(section.name))
                        : `Noticias de ${section.name}`
                }
                {...extraOpts}
                style={{
                    ...(colorCategory && {
                        color: colorCategory
                    })
                }}
            >
                <i className="--bullet --fourxs">{`>`}</i>
                {i + 1 === sections.length && isRecipe
                    ? capitalizeFirstLetter(textSelector(section.name))
                    : section.name}
            </a>
        );
    });

function BreadcrumbBase(props) {
    const {
        sections: rawSections = [],
        extraClasses,
        dataSection,
        lastLinked,
        host,
        colorCategory = ''
    } = props;

    const sections = rawSections.filter(
        section => section.name && section.name.trim() !== ''
    );

    const extraOpts = {};

    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    let listSections = [];

    if (!lastLinked && sections.length) {
        let finalSections = sections;
        finalSections = finalSections.slice(0, finalSections.length - 1);
        listSections = getListSections(
            finalSections,
            extraOpts,
            host,
            colorCategory
        );
        const lastSection = sections.slice(
            sections.length - 1,
            sections.length
        )[0];
        listSections.push(
            <span
                className="com-text --fourxs"
                key={lastSection.path}
                style={{
                    ...(colorCategory && {
                        color: colorCategory,
                        opacity: `.7`
                    })
                }}
            >
                <i className="--bullet --fourxs">{`>`}</i>
                {lastSection.name}
            </span>
        );
    } else
        listSections = getListSections(
            sections,
            extraOpts,
            host,
            colorCategory
        );

    return (
        <nav className={`com-breadcrumb --no-app ${extraClasses || ''}`}>
            {listSections}
        </nav>
    );
}

export default BreadcrumbBase;
