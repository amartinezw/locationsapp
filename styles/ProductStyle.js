import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  containerWait: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productContainerStart: {
    padding: '2%',
  },
  productCard: {
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingTop: '5%',
    paddingBottom: '12%',
    borderRadius: 3,
  },
  productCardLocation: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 3,
  },
  containerTextLocation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtonPicking: {
    borderColor: 'green',
    borderWidth: 4,
    flex: 1,
    justifyContent: 'center',
  },
  letterSpace: {
    marginVertical: '1%',
  },
  imageContainer: {
    alignItems: 'stretch',
  },
  imageSize: {
    width: 380,
    height: 330,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: RFPercentage(5),
    fontFamily: 'Roboto',
  },
  alignText: {
    flex: 1,
    alignItems: 'center',
  },
  productContainer: {
    fontSize: RFPercentage(5),
    fontFamily: 'RobotoMedium',
  },
  productLabel: {
    fontSize: RFPercentage(4),
    fontFamily: 'RobotoLight',
  },
  totalPicking: {
    fontSize: RFPercentage(5),
    fontFamily: 'Roboto',
  },
  missingPicking: {
    fontSize: RFPercentage(5),
    fontFamily: 'Roboto',
    color: 'orange',
  },
  locationText: {
    fontSize: RFPercentage(5),
    fontFamily: 'RobotoMedium',
  },
  productComplete: {
    fontSize: RFPercentage(4),
    fontFamily: 'RobotoMedium',
    color: 'green',
  },
  productInProgresesComplete: {
    fontSize: RFPercentage(4),
    fontFamily: 'Roboto',
    color: 'green',
  },
  productInProgreses: {
    fontSize: RFPercentage(4),
    fontFamily: 'Roboto',
    color: 'orange',
  },
  productNotStarted: {
    fontSize: RFPercentage(4),
    fontFamily: 'Roboto',
    color: 'gray',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
