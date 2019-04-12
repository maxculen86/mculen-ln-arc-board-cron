import React, { Component } from 'react';
import Title from './sectionTitle';

export default class StoriesBox extends Component {
    render() {
        return (
            <section className="content-historia">
                <Title title="Historias" />
                {this.props.children}
            </section>
        );
    }
}
