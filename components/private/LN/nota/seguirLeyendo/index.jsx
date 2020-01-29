import React from 'react';

const Index = ({ related_content }) => {
    let links = [];
    if (related_content) {
        links = related_content.map(el => (
            <>
                <a href={el.website_url} className="com-link">
                    {el.label && el.label.volanta
                        ? `${el.label.volanta.text} `
                        : ''}
                    {el.headlines.basic}
                </a>
                <br />
            </>
        ));
    }
    return (
        <>
            <div className="links">{links}</div>
        </>
    );
};

export default Index;
