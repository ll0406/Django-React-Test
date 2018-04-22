import React, { Component } from 'react';
import './ChangeText.scss';

import FadeIn from '../FadeIn';

export default class ChangeText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { thisText, thatText, onRefresh } = this.props;

        return(
            <div className={'ChangeText'}>

                {/* Self-defined FadeIn wrapper that provides fade in animation */}
                <FadeIn motionkey={thisText}>
                    <div className={'link'} onClick={onRefresh}>
                        <h1 className={'highlight-text'}>{thisText}</h1>
                    </div>
                </FadeIn>

                <h1>FOR</h1>

                {/* Self-defined FadeIn wrapper that provides fade in animation */}
                <FadeIn motionkey={thatText}>
                    <div className={'link'} onClick={onRefresh}>
                        <h1 className={'highlight-text'}>{thatText}</h1>
                    </div>
                </FadeIn>

            </div>
        )
    }

}

