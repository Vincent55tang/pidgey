'use strict';
const React = require('react');
const {StyleSheet} = require('react-native');
const PidgeyButton = require('PidgeyButton');
const { signInWithGoogle } = require('../actions');
var { connect } = require('react-redux');

var View = require('View');
var Text = require('Text');

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class LoginButton extends React.Component {
    props: {
        style: any;
        source?: string;
        dispatch: (action: any) => Promise;
        onLoggedIn: ?() => void;
    };

    state: {
        isLoading: boolean;
    };
    _isMounted: boolean;

    constructor() {
        super();
        this.state = { isLoading: false };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <PidgeyButton
                    style={[styles.button, this.props.style]}
                    caption="Loading"
                    onPress={()=>{}}
                />
            );
        }
        return (
            <PidgeyButton
                style={[styles.button, this.props.style]}
                caption="Log in with Google!"
                onPress={() => this.signin()}
            />
        );
    }

    async signin() {
        const {dispatch, onLoggedIn} = this.props;

        this.setState({isLoading: true});
        try {
            await Promise.race([
                dispatch(signInWithGoogle()),
                timeout(20000),
            ]);
        } catch(e) {
            const message = e.message || e;
            alert(message);
            return;
        } finally {
            this._isMounted && this.setState({isLoading: false});
        }

        onLoggedIn && onLoggedIn();
    }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270
  },
});

module.exports = connect()(LoginButton);
