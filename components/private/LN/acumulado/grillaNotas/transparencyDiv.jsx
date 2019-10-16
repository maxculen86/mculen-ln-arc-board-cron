import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';

class TransparencyDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
    }

    componentDidMount() {
        this.setAlturaTransparency();
        window.addEventListener('resize', () => {
            this.setAlturaTransparency();
        });
    }

    setAlturaTransparency = () => {
        const articlesGrid = document.querySelectorAll(
            '.hlp-degrade article.mod-caja-nota'
        );
        const articleGrid = articlesGrid[articlesGrid.length - 1];
        const alturaArticle =
            articleGrid.offsetHeight || articleGrid.clientHeight;
        this.setState({ height: alturaArticle });
    };

    render() {
        const { height } = this.state;
        const style = {
            heigth: `${height}px`
        };
        return <div className="transparency" style={style} />;
    }
}

TransparencyDiv.propTypes = {
    height: PropTypes.number.isRequired
};

export default TransparencyDiv;
