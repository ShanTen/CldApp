import React from 'react';
import { View } from '@/components/Themed';
import { Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const bottomContainerHeight = SCREEN_HEIGHT * 0.35;
const thumbnailHeight = bottomContainerHeight * 0.8;
const thumbnailWidth = thumbnailHeight; // square thumbnails

type Props = {
  images: { uri: string }[];
};

const ImageGrid: React.FC<Props> = ({ images }) => {
  return (
    <View style={[styles.container, { height: bottomContainerHeight }]}>
      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{
              width: thumbnailWidth,
              height: thumbnailHeight,
              marginRight: 10,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: 'back',
    backgroundColor: 'black',
  },
});

export default ImageGrid;
