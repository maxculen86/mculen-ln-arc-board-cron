import React, { PureComponent } from 'react';
import LastVideosByProgram from '../../private/OTT/programa/lastVideosByProgram';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

class UltimosVideosDeProgramas extends PureComponent {
    constructor(props) {
        super(props);
        if (!Object.keys(this.props.globalContent).length)
            throw new Error(
                'El feature UltimosVideosDeProgramas debe ser utilizado en Templates'
            );

        switch (this.props.globalContentConfig.source) {
            case 'sectionSource':
                this.sectionId = this.props.globalContent._id;
                break;
            case 'videoSource':
                this.sectionId = get(
                    this.props,
                    'globalContent.taxonomy.sections[0].name',
                    null
                );
                break;
        }
    }
    render() {
        if (!this.sectionId) return null;
        return <LastVideosByProgram sectionId={this.sectionId} />;
    }
}

export default Consumer(UltimosVideosDeProgramas);
