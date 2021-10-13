import Consumer from 'fusion:consumer';

class AnexoMobileFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { hideByUrl, url, height } = this.props.customFields;
        let resp = {};

        resp = {
            information: {
                hideCaja: hideByUrl,
                layout: 'grilla1'
            },
            articles: [{ url, height }]
        };

        return resp;
    }
}

export default Consumer(AnexoMobileFeature);
