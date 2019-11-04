import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
  },
  containerList: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerOrder: {
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {    
    height: RFPercentage(45),
    resizeMode: 'contain',
  },
  imageSmall: {
    width: '40%',
    height: '20%',
    resizeMode: 'contain',
  },
  input: {
    textAlign: 'center',
    color: '#787575',
    fontSize: RFPercentage(5),
  },
  containerOrderList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  backOfList: {
    flex: 2,
    backgroundColor: 'white',
  },
  containerOrderClick: {
    alignItems: 'center',
    paddingVertical: '10%',
  },

  listContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  spinner: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraContainer: {
    padding: '0%',
  },
  letterSpace: {
    marginVertical: '1%',
    backgroundColor: 'white',
  },
  cameraCard: {
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingTop: '1%',
    paddingBottom: '7%',
    borderRadius: 3,
  },
  lineSeparation: {
    flex: 1,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.5,
    paddingVertical: '3%',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textOrden: {
    fontSize: RFPercentage(5),    
  },
  textOrdenKey: {
    fontSize: RFPercentage(4),    
  },
  clickProduct: {
    fontSize: RFPercentage(3),
    color: 'gray',
  },
});
