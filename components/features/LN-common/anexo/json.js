import Consumer from 'fusion:consumer';

class AnexoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { hideByUrl, url, heightMobile } = this.props.customFields;
        let resp = {};
        const urlAnexo = url?.trim() ?? '';
        const articles = urlAnexo !== '' ? [{ url, alto: heightMobile }] : [];
        resp = {
            information: {
                hideCaja: hideByUrl,
                layout: 'grilla1'
            },
            articles
        };

        return resp;
    }
}

export default Consumer(AnexoFeature);
