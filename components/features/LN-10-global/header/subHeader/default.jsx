import React from 'react';
import { useContent } from 'fusion:content';
import { useHeaderContext } from '../context';
import { SubHeader } from '@ln/common-ui-header';
import { Dollar } from './components/dollar';
import { Access } from './components/access';
import { setDollarData, setAccessData } from './_helper';
import filterDollar from '../../../../../content/filters/LN/services/dolar';
import useTermica from '../../../../private/common/hooks/useTermica';
import SubHeaderEventsScript from '../../../../private/common/scriptManager/SubHeaderEventsScript';
import Static from 'fusion:static';

const SubHeaderLN = () => {
    const { data: dollar = [] } =
        useContent({
            source: 'dolarSource',
            filter: filterDollar,
            staticMode: true
        }) || {};
    const { isHome, subHeaderClassNames } = useHeaderContext();

    const dollarValue = useTermica('dolar', dollar);
    const dollarData = setDollarData(dollarValue) || [];
    const accessData = setAccessData() || [];

    if (!isHome) return <></>;
    return (
        <Static id="subheader-LN10">
            <SubHeader className={subHeaderClassNames}>
                <div className="lay-container">
                    <div className="flex py-16 text-14 ai-center jc-between gap-24">
                        <div className="relative w-100 overflow-hidden">
                            <Dollar data={dollarData} />
                        </div>
                        <Access data={accessData} />
                    </div>
                </div>
            </SubHeader>
            <SubHeaderEventsScript />
        </Static>
    );
};

export default SubHeaderLN;
