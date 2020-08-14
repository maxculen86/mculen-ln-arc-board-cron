import React from 'react';
import ComLink from '../../../common/com-link';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';
import ComTitle from '../../../common/com-title';

const Index = ({ related_content }) => {
    let links = [];
    if (related_content) {
        links = related_content.map((el, index) => {
            const span =
                el.label && el.label.volanta
                    ? `<span class="hlp-bold">${el.label.volanta.text}</span>&nbsp;`
                    : '';
            const content = `${span} ${el.headlines.basic}`;
            return (
                <article data-pos={`toi${index + 1}`} data-id="1">
                    <ComTitle
                        tag="h2"
                        content={content}
                        link={el.website_url}
                        size="--threexs"
                    >
                        {el.headlines.basic}
                    </ComTitle>
                </article>
            );
        });
    }
    return (
        <>
            {/* <div className="links"></div> */}
            <div className="mod-keepreading">{links}</div>
        </>
    );
};

export default Index;
