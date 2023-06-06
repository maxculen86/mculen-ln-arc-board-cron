import React from 'react';
import { useContent } from 'fusion:content';

import { SubHeader } from '@ln/contenidos-ui-header';
import filterDollar from '../../../../content/filters/LN/services/dolar';
import { setDollarData, setAccessData } from './_helper';
import StaticContent from '../../common/staticContent';
import useTermica from '../../common/hooks/useTermica';
import SubHeaderEventsScript from '../../common/scriptManager/SubHeaderEventsScript';

const SubHeaderLN = () => {
    const { data: dollar = [] } =
        useContent({
            source: 'dolarSource',
            filter: filterDollar,
            staticMode: true
        }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const dollarData = setDollarData(dollarValue) || [];
    const accessData = setAccessData() || [];

    return (
        <StaticContent>
            <SubHeader>
                <SubHeader.Dollar data={dollarData} />
                <SubHeader.Access data={accessData} />
            </SubHeader>
            <SubHeaderEventsScript />
        </StaticContent>
    );
};

export default SubHeaderLN;
