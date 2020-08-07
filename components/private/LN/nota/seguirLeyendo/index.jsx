import React from 'react';
import ComLink from '../../../common/com-link';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';

const Index = ({ related_content }) => {
    let links = [];
    if (related_content) {
        links = related_content.map(el => (
            <>
                {/* <a href={el.website_url} className="link">
                    <span className="hlp-bold">
                            {el.label && el.label.volanta
                                ? `${el.label.volanta.text} `
                                : ''}
                    </span>
                    {el.headlines.basic}
                </a> */}
                <ComLink link={el.website_url} size="--threexs">
                    <span className="hlp-bold">
                        {el.label && el.label.volanta
                            ? `${el.label.volanta.text} `
                            : ''}
                    </span>
                    {el.headlines.basic}
                </ComLink>
            </>
        ));
    }
    return (
        <>
            {/* <div className="links"></div> */}
            <div className="mod-keepreading">{links}</div>
        </>
    );
};

export default Index;
