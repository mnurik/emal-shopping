import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './../../config/SliderEntry.style';
import styles, { colors } from './../../config/index.style';

export default class CarouselContainer extends Component {
  state = {
    slider1ActiveSlide: 1,
    slider1Ref: null
  };

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return <SliderEntry imgSrc={item} even={(index + 1) % 2 === 0} parallax={false} parallaxProps={parallaxProps} />;
  }

  render() {
    const { slider1ActiveSlide, slider1Ref } = this.state;
    const { entries } = this.props;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={entries}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(0, 0, 0, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={slider1Ref}
          tappableDots={!!slider1Ref}
        />
      </View>
    );
  }
}
