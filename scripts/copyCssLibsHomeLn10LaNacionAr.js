const fs = require('fs');

const copyCssLibsHomeLn10LaNacionAr = () => {
    try {
        const outputFilePath = 'resources/packages/css/homeln10-style.css';
        fs.unlinkSync(outputFilePath);

        const copyFile = (source, target) => {
            const fileContent = fs.readFileSync(source, 'utf-8');
            fs.appendFileSync(target, fileContent);
        };

        const file = package =>
            `resources/packages/css/@ln/${package}/index.css`;

        const filesToCopy = [
            // COMMON
            file('common-ui-button'),
            file('common-ui-dropdown'),
            file('common-ui-grid'),
            file('common-ui-header'),
            file('common-ui-icon'),
            file('common-ui-image'),
            file('common-ui-link'),
            file('common-ui-media'),
            file('common-ui-scrollinx'),
            file('common-ui-text'),
            file('common-ui-video'),
            // CONTENIDOS
            file('contenidos-ui-advance'),
            file('contenidos-ui-anexob'),
            file('contenidos-ui-banners'),
            file('contenidos-ui-bannersubscriber'),
            file('contenidos-ui-bngrid'),
            file('contenidos-ui-bomba'),
            file('contenidos-ui-cajaafondo'),
            file('contenidos-ui-cajahashtag'),
            file('contenidos-ui-cajaopinion'),
            file('contenidos-ui-cajaranking'),
            file('contenidos-ui-card'),
            file('contenidos-ui-cardgames'),
            file('contenidos-ui-contentlab'),
            file('contenidos-ui-dropdown'),
            file('contenidos-ui-link'),
            file('contenidos-ui-live'),
            file('contenidos-ui-navbarmobile'),
            file('contenidos-ui-opening'),
            file('contenidos-ui-pwamodal'),
            file('contenidos-ui-roof'),
            file('contenidos-ui-sass'),
            file('contenidos-ui-text'),
            file('contenidos-ui-timeline'),
            file('contenidos-ui-tooltip'),
            file('contenidos-ui-webstories')
        ];

        filesToCopy.forEach(file => {
            copyFile(file, outputFilePath);
        });
        console.log('✔️ Css libs Ln10 copied successfully');
    } catch (error) {
        console.log('❌ Something is wrong', error);
    }
};

copyCssLibsHomeLn10LaNacionAr();
