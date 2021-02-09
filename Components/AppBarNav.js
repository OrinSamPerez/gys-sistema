import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {firebaseG} from '../firebase.BD/firebase.conf'
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
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
  
    width: theme.spacing(6),
    height: theme.spacing(6),

    },
  }));
const exitApp = ()=>{
console.log('hola')
}

export default function AppBarNav({user}){
    const classes = useStyles()
    const avatar = user.charAt(0)
    return(
        <nav className="main-navegacion">
             
            <div className="info-nav">
                <div>
                    <Badge badgeContent={4} color="secondary">
                        <EmailIcon />
                    </Badge>
                </div>
                <div>
                    <h3 className="nameAvatar" >
                            {user}
                    </h3>
                </div>
                <div>

                    <Avatar className={classes.purple}><h1>{avatar}</h1></Avatar>
                </div>
                <div>
                    <Button onClick={exitApp} color="default">
                        <Typography variant="subtitle1" color="initial">
                            Salir
                        </Typography>
                    </Button>
                </div>
            </div>
            
        </nav>
      
    )
}