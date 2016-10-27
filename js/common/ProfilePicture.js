'use strict';

var Image = require('Image');
var React = require('React');
var PixelRatio = require('PixelRatio');

class ProfilePicture extends React.Component {
    props: {
        photo: string;
        size: number;
    }

    render() {
        const {photo, size} = this.props;
        console.log(photo);
        const scaledSize = size * PixelRatio.get();

        return (
            <Image
                source={{uri: photo}}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }}
            />
        );
    }
}

module.exports = ProfilePicture;
