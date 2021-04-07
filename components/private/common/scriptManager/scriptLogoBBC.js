import React from 'react';
// prettier-ignore

const ScriptLogoBBC = ({ distributorName }) => {
    const script = `!function(s,e,n,c,r){if(r=s._ns_bbcws=s._ns_bbcws||r,s[r]||(s[r+"_d"]=s[r+"_d"]||[],s[r]=function(){s[r+"_d"].push(arguments)},s[r].sources=[]),c&&0>s[r].sources.indexOf(c)){var t=e.createElement(n);t.async=1,t.src=c;var a=e.getElementsByTagName(n)[0];a.parentNode.insertBefore(t,a),s[r].sources.push(c)}}
    (window,document,"script","https://news.files.bbci.co.uk/ws/partner-analytics/js/pageTracker.min.js","s_bbcws");
s_bbcws('partner', 'lanacion.com');
s_bbcws('language', 'mundo');
s_bbcws('track', 'pageView');`
    /* prettier-ignore */
    const nodes = [
        <script
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: script }}
        />,
        <noscript
            dangerouslySetInnerHTML={{
                __html: `<img src="//a1.api.bbc.co.uk/hit.xiti?&x8=[synd_v5.7.0_nojs]&s=598346" height="1"width="1" border="0"alt="" />`
            }}
        />
    ];

    return (distributorName === 'BBC Mundo') ? nodes : null;
};

ScriptLogoBBC.propTypes = {
    distributorName: PropTypes.string.isRequired
};

export default ScriptLogoBBC;
