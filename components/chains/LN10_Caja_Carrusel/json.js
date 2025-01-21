import Consumer from 'fusion:consumer';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';

class CarouselChain {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { hideCarousel = false } = this.props.customFields;
        if (hideCarousel) {
            return null;
        }
        const error = validateCarruselChildren({
            children: this.props.children,
            childProps: this.childProps
        });
        if (error) {
            console.warn(error.message);
            return null;
        }
        const { title, link } = this.props.customFields;
        return {
            information: { title, link },
            videos: this.props.children.slice(0, 10)
        };
    }

    get childProps() {
        const { id, renderables } = this.props;
        const chain = renderables.find(({ props }) => props.id === id);
        return chain?.children.map(({ props }) => props) ?? [];
    }
}

export default Consumer(CarouselChain);
