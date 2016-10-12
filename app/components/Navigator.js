import React, { Component } from 'react';
import { Text, Navigator } from 'react-native';

export default class Navigator extends Component {
    render() {
        return (
                <Navigator
                    initialRoute = {{ title: 'LISTSSSS', index: 0 }}
                    renderScene = {(route, navigator) =>
                        <Text>Hello {route.title}!</Text>
                    }
                />
        );
    }
}
