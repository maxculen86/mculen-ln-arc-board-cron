import getMediaFigCaption from '../../../../../components/layouts/LN-Nota-Opinion/helpers/getMediaFigCaption';

describe('getMediaFigCaption', () => {
    it('returns empty text and attribution when mediaData is null or undefined', () => {
        expect(getMediaFigCaption(null)).toEqual({ text: '', attribution: '' });
        expect(getMediaFigCaption(undefined)).toEqual({
            text: '',
            attribution: ''
        });
    });

    it('returns caption text and author-source attribution for image media', () => {
        const mediaData = {
            type: 'image',
            caption: 'Foto de prueba',
            credits: {
                by: [{ name: 'Juan Pérez' }]
            },
            distributor: {
                name: 'Reuters'
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: 'Foto de prueba',
            attribution: 'Juan Pérez - Reuters'
        });
    });

    it('returns caption text and only author when image has no distributor', () => {
        const mediaData = {
            type: 'image',
            caption: 'Foto de prueba',
            credits: {
                by: [{ name: 'Juan Pérez' }]
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: 'Foto de prueba',
            attribution: 'Juan Pérez'
        });
    });

    it('returns caption text and only distributor when image has no author', () => {
        const mediaData = {
            type: 'image',
            caption: 'Foto de prueba',
            distributor: {
                name: 'Reuters'
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: 'Foto de prueba',
            attribution: 'Reuters'
        });
    });

    it('returns caption text and empty attribution when image has no author and no distributor', () => {
        const mediaData = {
            type: 'image',
            caption: 'Foto de prueba'
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: 'Foto de prueba',
            attribution: ''
        });
    });

    it('returns empty text when image caption is null or undefined', () => {
        const mediaData = {
            type: 'image',
            credits: {
                by: [{ name: 'Juan Pérez' }]
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: '',
            attribution: 'Juan Pérez'
        });
    });

    it('returns epigraphTitle text and empty attribution for video_jw subtype', () => {
        const mediaData = {
            subtype: 'video_jw',
            embed: {
                config: {
                    videoJw: {
                        epigraphTitle: 'Título del video'
                    }
                }
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: 'Título del video',
            attribution: ''
        });
    });

    it('returns empty text when video_jw has no epigraphTitle', () => {
        const mediaData = {
            subtype: 'video_jw',
            embed: {
                config: {
                    videoJw: {}
                }
            }
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: '',
            attribution: ''
        });
    });

    it('returns empty text and attribution for unsupported media types', () => {
        const mediaData = {
            type: 'audio',
            caption: 'Audio caption'
        };

        expect(getMediaFigCaption(mediaData)).toEqual({
            text: '',
            attribution: ''
        });
    });
});
