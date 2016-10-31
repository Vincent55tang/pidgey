'use strict';

const React = require('React');
const {
    View,
    StyleSheet,
    ScrollView,
    ViewPagerAndroid,
} = require('react-native');

type Props = {
    count: number;
    selectedIndex: number;
    onSelectedIndexChange?: (index: number) => void;
    bouncess?: boolean;
    children?: any;
    style?: any;
};

type State = {
    width: number;
    height: number;
    selectedIndex: number;
    initialSelectedIndex: number;
    scrollingTo: ?number;
}

class ViewPager extends React.Component {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            selectedIndex: this.props.selectedIndex,
            initialSelectedIndex: this.props.selectedIndex,
            scrollingTo: null,
        };
        (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
        (this: any).adjustCardSize = this.adjustCardSize.bind(this);
    }

    render() {
        return <ViewPagerAndroid
            ref="scrollview"
            initialPage={this.state.initialSelectedIndex}
            onPageSelected={this.handleHorizontalScroll}
            style={styles.container}>

            {this.renderContent()}
        </ViewPagerAndroid>
    };

    adjustCardSize(e: any) {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if(nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({scrollingTo: nextProps.selectedIndex});
        } else {
            this.refs.scrollView.setPage(nextProps.selectedIndex);
            this.setState({selectedIndex: nextProps.selectedIndex});
        }
    }

    renderContent(): Array<ReactElement> {
        var {width, height} = this.state;
        var style = styles.card;

        return React.Children.map(this.props.children, (child, i) => (
            <View style={[style, {width, height}]} key={'r_' + i}>
                {child}
            </View>
        ));
    }

    handleHorizontalScroll(e: any) {
        var selectedIndex = e.nativeEvent.position;
        if(selectedIndex === undefined) {
            selectedIndex = Math.round(
                e.nativeEvent.contentOffset.x / this.state.width,
            );
        }
        if(selectedIndex < 0 || selectedIndex >= this.props.count) {
            return;
        }
        if(this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
            return;
        }
        if(this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
                this.setState({selectedIndex, scrollingTo: null});
                const { onSelectedIndexChange } = this.props;
                onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
        }
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    card: {
        backgroundColor: 'transparent',
    }
});

module.exports = ViewPager;
