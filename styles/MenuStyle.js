import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  profileImage: {
    width: 125,
    height: 125,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  menuContainer: {
    padding: '2%',
  },
  menuCard: {
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: '4%',
    paddingTop: '3%',
    paddingBottom: '7%',
    borderRadius: 3,
  },
  profileTitle: {    
    fontSize: RFPercentage(4),
    textAlign: 'center',
  },
  profileSubtitle: {    
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  cardTitle: {    
    fontSize: RFPercentage(3),
    color: '#515151',
    alignSelf: 'flex-start',
    marginBottom: '3%',
  },
  configText: {    
    fontSize: RFPercentage(3),
  },
  configOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionText: {
    fontSize: RFPercentage(2.5),
    color: '#adadad',
  },
});
