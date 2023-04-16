import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type TitleProps = {
  title: string;
  backButton?: boolean;
};

const TitleHeader = ({title, backButton}: TitleProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {backButton && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>
              <Icon name="chevron-back" size={30} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.3,
    color: '#1B1B1B',
    // textAlign:'center'
  },
  iconContainer: {
    flex: 0.11,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
