import React from 'react';
import { useContent } from 'fusion:content';
import { SubHeader } from '@ln/common-ui-header';
import Static from 'fusion:static';
import { useHeaderContext } from '../context';
import Dollar from './components/dollar';
import { Access } from './components/access';
import { setDollarData, setAccessData } from './_helper';
import filterDollar from '../../../../../content/filters/LN/services/dolar';
import useTermica from '../../../../private/common/hooks/useTermica';
import SubHeaderEventsScript from '../../../../private/common/scriptManager/SubHeaderEventsScript';

function SubHeaderLN() {
    const dollarValue = useTermica('dolar');

    const { data: dollar = [] } =
        useContent({
            source: dollarValue ? 'dolarSource' : null,
            filter: filterDollar,
            staticMode: true
        }) || {};

    const { isHome, subHeaderClassNames } = useHeaderContext();

    const dollarData = setDollarData(dollar);
    const accessData = setAccessData() || [];

    if (!isHome) return null;
    return (
        <Static id="subheader-LN10">
            <SubHeader className={subHeaderClassNames}>
                <div className="lay-container">
                    <div className="flex py-16 text-14 ai-center jc-between gap-24">
                        <div className="relative w-100 overflow-hidden">
                            <Dollar dollarData={dollarData} />
                        </div>
                        <Access accessData={accessData} />
                    </div>
                </div>
            </SubHeader>
            <SubHeaderEventsScript />
        </Static>
    );
}

export default SubHeaderLN;
