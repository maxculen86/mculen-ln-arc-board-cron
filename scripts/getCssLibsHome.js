const fs = require('fs');

const getCssLibsHome = () => {
    try {
        const outputFilePathStyles =
            'resources/packages/css/LN10-Home_Main.css';
        fs.unlinkSync(outputFilePathStyles);

        const outputFilePathCriticalStyles =
            'resources/packages/css/LN10-Home_Main-critical.css';
        fs.unlinkSync(outputFilePathCriticalStyles);

        const copyFile = (source, target) => {
            const fileContent = fs.readFileSync(source, 'utf-8');
            fs.appendFileSync(target, fileContent);
        };

        const file = packageName =>
            `resources/packages/css/@ln/${packageName}/index.css`;

        const filesToCopyStyles = [
            // CONTENIDOS
            file('contenidos-ui-bannersubscriber'),
            file('contenidos-ui-cajaafondo'),
            file('contenidos-ui-cajahashtag'),
            file('contenidos-ui-cajaopinion'),
            file('contenidos-ui-cajaranking'),
            file('contenidos-ui-contentlab'),
            file('contenidos-ui-roof')
        ];
        const filesToCopyCriticalStyles = [
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
            file('contenidos-ui-bngrid'),
            file('contenidos-ui-bomba'),
            file('contenidos-ui-card'),
            file('contenidos-ui-dropdown'),
            file('contenidos-ui-link'),
            file('contenidos-ui-live'),
            file('contenidos-ui-navbarmobile'),
            file('contenidos-ui-opening'),
            file('contenidos-ui-pwamodal'),
            file('contenidos-ui-sass'),
            file('contenidos-ui-text'),
            file('contenidos-ui-timeline'),
            file('contenidos-ui-tooltip'),
            file('contenidos-ui-webstories')
        ];

        filesToCopyStyles.forEach(file => {
            copyFile(file, outputFilePathStyles);
        });
        filesToCopyCriticalStyles.forEach(file => {
            copyFile(file, outputFilePathCriticalStyles);
        });
        console.log('✔️ Css libs Ln10 copied successfully');
    } catch (error) {
        console.log('❌ Something is wrong', error);
    }
};

getCssLibsHome();
