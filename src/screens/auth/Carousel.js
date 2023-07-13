import React, {useRef, useState} from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { navigateToAuth } from "../../navigation";

const {width, height} = Dimensions.get('window')

const data = [
  {
    id: 0,
    title: 'The best App in the market',
    text: 'You can\'t say anything, because it is increadible',
    color: 'red'
  },
  {
    id: 1,
    title: 'A elegant design',
    text: 'look at this pure and sophisticated design',
    color: 'green'
  },
  {
    id: 2,
    title: 'Stability is priority',
    text: 'Certified 100% without bugs',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Security is priority (rhymes before inventiveness) (Yes this sentence was deepl translate)',
    text: 'We assure that your data will not be selled to the following adress \"sendAccountToEarnMoney@fraud.scam\" in order to earn 5€ per email adress sent. Enter Email by clicking right bellow.',
    color: 'yellow'
  },
]

const CarouslItem = ({item}) => {
  return(
    <View style={{
      backgroundColor: item.color,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        color: 'black',
        fontSize: 40,
        
      }}>{item.title}</Text>
      <Text style={{
        color: 'black',
        fontSize: 20,
        marginTop: 30,
        
      }}>{item.text}</Text>
    </View>
  )
}

const Pagination = ({data, scrollX, index, scrollToIndex}) => {
  return(
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 60,
      width: '100%',
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
      }}>
        {data.map((item, index) => {

          const dotWidth = scrollX.interpolate({
            inputRange: [width*(index-1), width*index, width*(index+1)],
            outputRange: [12, 30, 12],
            extrapolate: 'clamp'
          })
          const dotcolor = scrollX.interpolate({
            inputRange: [width*(index-1), width*index, width*(index+1)],
            outputRange: ['#fff', '#000', '#fff'],
            extrapolate: 'clamp'
          })

          return (<Animated.View 
            key={index.toString()} 
            style={{
              width: dotWidth,
              height: 12,
              borderRadius: 6,
              backgroundColor: dotcolor,
              marginHorizontal: 3
            }} 
          />)
        })}
      </View>
      <TouchableWithoutFeedback onPress={() => {
        if (index < 3) {
          scrollToIndex(index + 1);
        } else {
          navigateToAuth('Carousel');
        }
      }}>
        <View style={{
          backgroundColor: '#ccc8',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 800,
            color: '#222',
          }}>{ index!==3 ? 'Next' : 'Connect'}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Carousel = () => {

  const flatlistRef = useRef(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [pageIndex, setPageIndex] = useState(0);

  const handleScroll = event => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          }
        }
      }
    ], {
      useNativeDriver: false
    })(event);
  }

  const handleChange = useRef(({viewableItems}) => {
    setPageIndex(viewableItems[0].index);
  }).current;

  const scrollToIndex = (index) => {
    flatlistRef?.current?.scrollToIndex({index});
  }

  return(
    <View>
      <FlatList
        ref={flatlistRef}
        style={{backgroundColor: 'pink'}}
        data={data}
        renderItem={({item}) => <CarouslItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleChange}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
      />
      <Pagination data={data} scrollX={scrollX} index={pageIndex} scrollToIndex={scrollToIndex} />
    </View>
  )
}

