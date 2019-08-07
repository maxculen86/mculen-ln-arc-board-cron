export default {
    title: 'LA NACION',
    className: {
        body: 'ln'
    },
    imageConfig: {
        resize: {
            nota: {
                bySubtype: {
                    4: {
                        apertura_big: {
                            width: 1033,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            type: 'apertura'
                        },
                        apertura_medium: {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'apertura'
                        },
                        apertura_small: {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'apertura'
                        },
                        cuerpo_medium: {
                            width: 768,
                            media: '(min-width: 740px)',
                            class: 'img-desktop-sm',
                            type: 'cuerpo'
                        },
                        cuerpo_small: {
                            width: 340,
                            media: '(min-width: 320px)',
                            class: 'img-mobile',
                            type: 'cuerpo'
                        }
                    }
                }
            }
        }
    }
};
