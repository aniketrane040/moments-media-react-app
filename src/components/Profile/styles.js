import { makeStyles } from '@material-ui/core/styles';
import demoText from '../../images/demoTest.jpeg';
import { deepOrange } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  cameraIcon: {
    height: '4rem',
    width: '4rem',
    position: 'absolute',
    bottom: '0',
    right: '100px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white'
    }
  },
    profImg: {
        position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: {demoText},
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },

      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
      editProfile: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      sizeAvatar: {
        height: "175px",
        width: "175px",
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      userFollow: {
        display : 'flex',
        justifyContent: 'space-between',
        width: "300px",
        alignItems: 'center',
        align:'center'
      },
      avatarcontainer: {
        width: '500px',
        height: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate('-50%', '-50%')',
      },
      avatar : {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }
}));