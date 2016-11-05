'use strict';
const React = require('react');
const {StyleSheet} = require('react-native');
const PidgeyButton = require('PidgeyButton');
const { tsp } = require('../actions');
var { connect } = require('react-redux');
import { NativeModules } from 'react-native';
var TSP = NativeModules.TSP;

class TSPButton extends React.Component {
    props: {
        style: any;
        source?: string;
        dispatch: (action: any) => Promise;
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
                caption="Solve"
                onPress={() => this.solve()}
            />
        );
    }

    async solve() {
        const {dispatch} = this.props;
        this.getDistanceMatrix();
        this.setState({isLoading: true});
        try {
          TSP.solve("Hello there!", 10);
          console.log("DDDD");
        } catch(e) {
            const message = e.message || e;
            alert(message);
            return;
        } finally {
            this._isMounted && this.setState({isLoading: false});
        }
    }

    async getDistanceMatrix() {
      
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

module.exports = connect()(TSPButton);
