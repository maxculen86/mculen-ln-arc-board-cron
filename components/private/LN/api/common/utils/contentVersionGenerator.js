const crypto = require('crypto');

const generateHashContentVersion = home => {
    try {
        const items = {
            firstArticlesIds: getArticlesIdsBySection(home, 'apertura'),
            bombitaSection: getArticlesIdsBySection(home, 'bombita'),
            anticipoSection: getAnticipoSectionsTitles(home)
        };

        return crypto
            .createHash('sha256')
            .update(JSON.stringify(items))
            .digest('hex');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            `Error generateHashContentVersion - errorMsj:${error.message}`
        );

        return '';
    }
};

const getArticlesIdsBySection = (home, section) => {
    const sections = home.filter(x => {
        return x['tipoSeccion'] === section;
    });

    return sections.map(s => {
        return s['notas'].map(nota => {
            return nota['id'];
        });
    });
};

const getAnticipoSectionsTitles = home => {
    const sections = home.filter(x => {
        return x['tipoSeccion'] === 'anticipo';
    });

    return sections.map(section => {
        return section['parameters']['title'];
    });
};

export { generateHashContentVersion };
