/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import { getSectionOfRequestUri } from '../utils/outputTypeHelper';

const EXCLUDED_SCRIPTS_BY_SECTION = {
    '/estados-unidos': ['oneTag']
};

const SCRIPT_MANAGER_MANAGED_SCRIPT_IDS = ['vwoCode'];

function TagsLoadingList({
    arcSite: website = 'la-nacion-ar',
    location = 'body-bottom',
    section = '',
    requestUri = '',
    Tag,
    globalContent = {}
}) {
    const { contextPath, deployment } = useAppContext();
    const resp = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        filter: `{
            site {
                ${Tag}_loading_list
            }
        }`,
        transform: data => get(data, `site.${Tag}_loading_list`, []),
        staticMode: true
    });

    if (!Tag) return null;

    return resp.map((scriptConfig, index) => {
        try {
            const scriptData = JSON.parse(scriptConfig);
            const { location: _location = 'body-bottom', section: _section } =
                scriptData;

            Object.keys(scriptData).forEach(jsonAttr => {
                const wordValidation = 'validate';
                if (!jsonAttr.search(wordValidation)) {
                    const {
                        defaultValue = '',
                        propName = `Error propName ${jsonAttr}`
                    } = scriptData[jsonAttr];

                    const valueInGlobalContent = get(
                        globalContent,
                        jsonAttr.substring(wordValidation.length + 1),
                        ''
                    );

                    scriptData[propName] =
                        String(
                            valueInGlobalContent || defaultValue
                        ).toLowerCase() || '';

                    delete scriptData[jsonAttr];
                }
            });

            if (scriptData.addArcVersion) {
                scriptData.src = deployment(`${contextPath}/${scriptData.src}`);
            }

            delete scriptData.addArcVersion;
            delete scriptData.location;
            delete scriptData.section;

            const sectionActive = section === _section || _section === 'all';
            const uniqueKey = `${_location}-${_section}-${scriptData.src || scriptConfig.substring(0, 50)}-${index}`;

            const currentSection = getSectionOfRequestUri(requestUri);
            const excludedScripts =
                EXCLUDED_SCRIPTS_BY_SECTION[`/${currentSection}`] || [];
            const shouldExclude =
                excludedScripts.includes(scriptData.id) ||
                SCRIPT_MANAGER_MANAGED_SCRIPT_IDS.includes(scriptData.id);

            return (
                !shouldExclude &&
                sectionActive &&
                location === _location && (
                    <Tag {...scriptData} key={uniqueKey} />
                )
            );
        } catch (error) {
            // Agregar DataDog
            console.log('🚀 ~ file: tagsLoadingList ~ error');
            return null;
        }
    });
}

export default TagsLoadingList;
