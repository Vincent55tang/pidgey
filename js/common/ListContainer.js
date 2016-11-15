/**
 * @providesModule ListContainer
 */

'use strict';

var Animated = require('Animated');
var NativeModules = require('NativeModules');
var Dimensions = require('Dimensions');
var PidgeyHeader = require('PidgeyHeader');
var React = require('React');
var ParallaxBackground = require('ParallaxBackground');
var ReactNative = require('ReactNative');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Text } = require('PidgeyText');
var ViewPager = require('./ViewPager');

import type {Item as HeaderItem} from 'PidgeyHeader';

type Props = {
    title: string;
    leftItem?: HeaderItem;
    rightItem?: HeaderItem;
    extraItems?: Array<HeaderItem>;
    selectedSegment?: number;
    selectedSectionColor: string;
    backgroundImage: number;
    backgroundColor: string;
    stickyHeader?: ?ReactElement;
    onSegmentChange?: (segment: number) => void;
    children?: any;
};

type State = {
    idx: number;
    anim: Animated.Value;
    stickyHeaderHeight: number;
};

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

var ProgressBarAndroid = require('ProgressBarAndroid');


class ListContainer extends React.Component {
    props: Props;
    state: State;
    _refs: Array<any>;
    _pinned: any;

    static defaultProps = {
        selectedSectionColor: 'white',
    };

    static contextTypes = {
        openDrawer: React.PropTypes.func,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            idx: this.props.selectedSegment || 0,
            anim: new Animated.Value(0),
            stickyHeaderHeight: 0,
        };

        (this: any).handleShowMenu = this.handleShowMenu.bind(this);
        (this: any).handleSelectSegment = this.handleSelectSegment.bind(this);
        this._refs = [];
    }

    render() {
        var leftItem = this.props.leftItem;

        if (!leftItem) {
            leftItem = {
                title: 'Menu',
                icon: require('./img/hamburger.png'),
                onPress: this.handleShowMenu,
            };
        }

        const segments = [];

        const content = React.Children.map(this.props.children, (child, idx) => {
            segments.push(child.props.title);
            return React.cloneElement(child, {
                ref: (ref) => { this._refs[idx] = ref; },
                onScroll: (e) => this.handleScroll(idx, e),
                style: styles.listView,
                showsVerticalScrollIndicator: false,
                scrollEventThrottle: 16,
                contentInset: {bottom: 49, top: 0},
                automaticallyAdjustContentInsets: false,
                renderHeader: this.renderFakeHeader,
                scrollsToTop: idx === this.state.idx,
            });
        });

        const backgroundShift = segments.length === 1
            ? 0
            : this.state.idx / (segments.length - 1);

        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                <PidgeyHeader
                    title={this.props.title}
                    leftItem = {leftItem}
                    rightItem = {this.props.rightItem}
                    extraitems = {this.props.extraItems}>
                </PidgeyHeader>
                </View>
                {content}
            </View>
        );
    }

    renderParallaxContent() {
        if (this.props.parallaxContent) {
            return this.props.parallaxContent;
        }
        return (
            <Text style={styles.parallaxText}>
                {this.props.title}
            </Text>
        );
    }

    handleScroll(idx: number, e: any) {
        if(idx !== this.state.idx) {
            return;
        }
        let y = 0;
        this._refs.forEach((ref, ii) => {
            if(ii !== idx && ref) {
                ref.scrollTo && ref.ScrollTo({y, animated:false});
            }
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (typeof nextProps.selectedSegment === 'number' &&
            nextProps.selectedSegment !== this.state.idx) {
                this.setState({idx: nextProps.selectedSegment});
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!NativeModules.PidgeyScrolling) {
            return;
        }

        if (this.state.idx !== prevState.idx ||
            this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
                var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

                if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
                    const oldScrollViewTag = ReactNative.findNodeHandle(
                        this._refs[prevState.idx].getScrollResponder()
                    );
                    NativeModules.PidgeyScrolling.unpin(oldScrollViewTag);
                }

                if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
                    const newScrollViewTag = ReactNative.findNodeHandle(
                        this._refs[this.state.idx].getScrollResponder()
                    );
                    const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
                    NativeModules.PidgeyScrolling.pin(newScrollViewTag, pinnedViewTag, distance);
                }
            }
        }

        handleSelectSegment(idx: number) {
            if (this.state.idx !== idx) {
                const {onSegmentChange} = this.props;
                this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
            }
        }

        handleShowMenu() {
            this.context.openDrawer();
        }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
      elevation: 1,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,

      marginRight: -1,
      borderRightColor: 'transparent',
  },
  listView: {
    backgroundColor: 'white'
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parallaxText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  stickyHeader: {
    position: 'absolute',
    top: PidgeyHeader.height,
    left: 0,
    right: 0,
  },
});

module.exports = ListContainer;
