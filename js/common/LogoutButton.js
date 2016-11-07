'use strict';
const React = require('react');
const {StyleSheet} = require('react-native');
const PidgeyButton = require('PidgeyButton');
const { signOut } = require('../actions');
var { connect } = require('react-redux');

class LogoutButton extends React.Component {
    props: {
        style: any;
        source?: string;
        dispatch: (action: any) => Promise;
        onLoggedOut: ?() => void;
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
                caption="Log Out"
                onPress={() => this.signout()}
            />
        );
    }

    async signout() {
        const {dispatch, onLoggedIn} = this.props;

        this.setState({isLoading: true});
        try {
            await Promise.race([
                dispatch(signOut())
            ]);
        } catch(e) {
            const message = e.message || e;
            alert(message);
            return;
        } finally {
            this._isMounted && this.setState({isLoading: false});
        }

        onLoggedOut && onLoggedOut();
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

module.exports = connect()(LogoutButton);
