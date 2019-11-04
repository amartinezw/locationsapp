import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  loginScreen: {
    flex: 1,
    padding: '3%',
  },
  loginHeader: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',    
    fontSize: RFPercentage(5),
    marginTop: '4%',
  },
  imageSubTitle: {
    color: 'white',    
    fontSize: RFPercentage(4),
  },
  image: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
  },
  loginForm: {
    flex: 1,
    justifyContent: 'space-around',
  },
  loginInput: {
    flexDirection: 'row',
  },
  inputIcon: {
    color: '#cecece',
    fontSize: RFPercentage(5),
    paddingRight: 10,
  },
  inputText: {
    flex: 1,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: RFPercentage(3),    
  },
});
