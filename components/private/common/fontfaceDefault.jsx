import React from 'react';
import { FONT_BOLD, FONT_MEDIUM } from 'fusion:environment';

const FontFaceDefault = () => {
    const stringScript = `
        const loadFont = ({family, url, config}) => {
            var font = new FontFace(family, url, config);
            
            font.load().then(function() {
                // apply the font (which may re-render text and cause a page reflow)
                // after the font has finished downloading
                document.fonts.add(font);
            });
        }

        loadFont({
            family: "SuecaSlab",
            url:"url('${FONT_BOLD}')", 
            config:{
                format: 'woff2',
                weight: '700',
                style: 'normal',
                display: 'swap'
            }
        });
        loadFont({
            family: "SuecaSlab",
            url:"url('${FONT_MEDIUM}')", 
            config:{
                format: 'woff2',
                weight: '500',
                style: 'normal',
                display: 'swap'
            }
        });
`;

    return <script defer dangerouslySetInnerHTML={{ __html: stringScript }} />;
};

export default FontFaceDefault;
