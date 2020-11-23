/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from '../utils/get';

const ScriptLoadingList = ({ arcSite: website = 'la-nacion-ar' }) => {
    const data = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        filter: `{
            site {
                script_loading_list
            }
        }`
    });

    return get(data, 'site.script_loading_list', []).map(scriptConfig => {
        try {
            return <script {...JSON.parse(scriptConfig)} />;
        } catch (error) {
            console.log('🚀 ~ file: scriptLoadingList ~ error', error);
            return <></>;
        }
    });
};

ScriptLoadingList.propTypes = {
    arcSite: PropTypes.string.isRequired
};

export default ScriptLoadingList;
