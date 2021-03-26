import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {firebaseG} from '../BD-Firebase/firebase.conf'
import swal from 'sweetalert';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NotificationsNoneSharpIcon from '@material-ui/icons/NotificationsNoneSharp';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: '#F6F6F6',
      backgroundColor: '#FFB400',
  
    width: theme.spacing(4),
    height: theme.spacing(4),

    },
  }));
const exitApp = ()=>{
    swal('¿Seguro, que deseas salir de la apliacion?',{
        buttons:['Cancelar','Salir']
    }).then(result =>{
        if(result === true){
            firebaseG.auth().signOut();
        }
    })
}

export default function AppBarNav({user}){
    const classes = useStyles()
    const avatar = user.charAt(0)
    return(
        <nav className="main-navegacion">
             
            <div className="info-nav">
                <div title="Notificaciones">
                        <NotificationsNoneSharpIcon  style={{cursor:'pointer', color:'#FFB400',marginRight:'10px'}}fontSize="medium" />
                </div>
                <div>

                    <Avatar className={classes.purple}><h3>{avatar.toUpperCase()}</h3></Avatar>
                </div>
                <div>
                    <h3 className="nameAvatar" >
                            {user}
                    </h3>
                </div>
                
                <div >
                    <Button  onClick={exitApp} color="default">
                        <div title="Salir">
                            <ExitToAppRoundedIcon style={{cursor:'pointer', color:'#FFB400', marginTop:'6px'}}  fontSize="medium"/>
                            </div>
                        
                    </Button>
                </div>
            </div>
            
        </nav>
      
    )
}