import React from 'react';
import BreadcrumbArticle from '../../../../features/LN-nota/breadcrumbArticle';
import StaticContentV2 from '../../../../chains/LN10-global/staticContentV2';

function BodyTop({ children, dateTime }) {
    const { date, time } = dateTime;
    return (
        <div className="row">
            <div className="flex flex-column">
                <BreadcrumbArticle className="mb-0 pb-16" />
                <StaticContentV2 htmlOnly>
                    <ul className="com-date flex jc-start ai-center --bullet-list_12 w-100 pb-12 pb-0_m">
                        <li className="flex ai-center text-neutral-light-700">
                            <time dateTime={date}>{date}</time>
                        </li>
                        <li className="flex ai-center text-neutral-light-700">
                            <time dateTime={time}>{time}</time>
                        </li>
                    </ul>
                </StaticContentV2>
                {children}
            </div>
        </div>
    );
}

export default BodyTop;
