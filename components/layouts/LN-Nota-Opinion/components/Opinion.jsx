import React from 'react';
import { useAppContext } from 'fusion:context';
import Opening from './apertura/Opening';

function Opinion({ children }) {
    const { globalContent, siteProperties } = useAppContext();
    return (
        <>
            <Opinion.Opening>
                <Opening.Breadcrumb
                    globalContent={globalContent}
                    siteProperties={siteProperties}
                />
                <Opening.Title content={globalContent.headlines.basic} />
            </Opinion.Opening>
            {children}
        </>
    );
}

Opinion.Opening = Opening;

export default Opinion;
