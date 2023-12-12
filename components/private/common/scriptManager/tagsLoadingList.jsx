/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';

const TagsLoadingList = ({
    arcSite: website,
    location,
    section,
    Tag,
    globalContent
}) => {
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

    if (!Tag) return <></>;

    return resp.map((scriptConfig, index) => {
        try {
            const scriptData = JSON.parse(scriptConfig);
            const {
                location: _location = 'body-bottom',
                section: _section
            } = scriptData;

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

            return (
                section === _section &&
                location === _location && <Tag {...scriptData} key={index} />
            );
        } catch (error) {
            // Agregar DataDog
            console.log('🚀 ~ file: tagsLoadingList ~ error');
            return <></>;
        }
    });
};

TagsLoadingList.propTypes = {
    arcSite: PropTypes.string,
    Tag: PropTypes.string,
    location: PropTypes.string,
    section: PropTypes.string
};

TagsLoadingList.defaultProps = {
    section: '',
    arcSite: 'la-nacion-ar',
    globalContent: {},
    location: 'body-bottom'
};

export default TagsLoadingList;
