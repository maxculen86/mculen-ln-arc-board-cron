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

    const ids = sections.map(section => {
        return section['notas'].map(nota => {
            return nota['id'];
        });
    });

    return ids;
};

const getAnticipoSectionsTitles = home => {
    const sections = home.filter(x => {
        return x['tipoSeccion'] === 'anticipo';
    });

    const titles = sections.map(section => {
        return section['parameters']['title'];
    });

    return titles;
};

export { generateHashContentVersion };
