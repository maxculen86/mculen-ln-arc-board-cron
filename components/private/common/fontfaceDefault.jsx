import React from 'react';
import { useAppContext } from 'fusion:context';

const FontFaceDefault = () => {
    const { contextPath, deployment } = useAppContext();

    const deployFont = font =>
        deployment(`${contextPath}/resources/fonts/${font}`);

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
            url:"url('${deployFont('suecaslab-bold-webfont.woff2')}')", 
            config:{
                format: 'woff2',
                weight: '700',
                style: 'normal',
                display: 'swap'
            }
        });
        loadFont({
            family: "SuecaSlab",
            url:"url('${deployFont('suecaslab-medium-webfont.woff2')}')", 
            config:{
                format: 'woff2',
                weight: '500',
                style: 'normal',
                display: 'swap'
            }
        });
        loadFont({
            family: "LNlogos",
            url:"url('${deployFont('lana-logos-v1.woff')}')", 
            config:{
                format: 'woff',
                weight: 'normal',
                style: 'normal',
                display: 'swap'
            }
        });
`;

    return <script defer dangerouslySetInnerHTML={{ __html: stringScript }} />;
};

export default FontFaceDefault;

// loadFont({
//     family: "LNicons",
//     url:"url('${deployment(
//         `${contextPath}/resources/fonts/lana-icons-v1.woff`
//     )}')",
//     config:{
//         format: 'woff',
//         weight: 'normal',
//         style: 'normal',
//         display: 'swap'
//     }
// });
