/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { criticalCssPathsBySite } from './helpers';
import get from '../../private/common/utils/get';

export function GetCriticalCss({ Resource }) {
    if (!Resource || typeof Resource !== 'function') {
        return null;
    }

    const path = get(criticalCssPathsBySite, 'foodit.default', '');

    if (!path) return null;

    return (
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
    );
}

GetCriticalCss.propTypes = {
    Resource: PropTypes.func.isRequired
};
