import Consumer from 'fusion:consumer';

class AnexoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { html, hideByHtml } = this.props.customFields;
        return {
            information: { hideCaja: hideByHtml, layout: 'grilla1' },
            articles: [{ html }]
        };
    }
}

export default Consumer(AnexoFeature);
