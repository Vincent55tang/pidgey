'use strict';

/**
 * @providesModule PidgeyTouchable
 */

import React from 'react';
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';

function PidgeyTouchableIOS(props: Object): ReactElement {
    return (
        <TouchableHighlight
            accessibilityTraits="button"
            underlayColor="#3C5EAE"
            {...props}
        />
    );
}

const PidgeyTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : PidgeyTouchableIOS;

module.exports = PidgeyTouchable;
