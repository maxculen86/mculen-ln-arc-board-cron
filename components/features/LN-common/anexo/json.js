import Consumer from 'fusion:consumer';

class AnexoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const {
            html,
            hideByHtml,
            hideByUrl,
            url,
            height
        } = this.props.customFields;
        let resp = {};

        resp = {
            information: {
                hideCaja: null,
                layout: 'grilla1',
                hideByUrl,
                hideByHtml
            },
            articles: [{ url, height, html }]
        };

        return resp;
    }
}

export default Consumer(AnexoFeature);
