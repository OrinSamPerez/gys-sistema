
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';



export default function AppBarNav(){
    return(
        <nav className="main-navegacion">
            
            <div className="info-nav">
                <Button variant="text" color="default">
                    <EmailIcon color="secondary" />
                </Button>
                <h3 className="nameAvatar" >
                        Orlin Perez
                </h3>
                <div>

                    <Avatar>Op</Avatar>
                </div>
                <div>
                    <Button color="default">
                        <Typography variant="subtitle1" color="initial">
                            Salir
                        </Typography>
                    </Button>
                </div>
            </div>
            
        </nav>
      
    )
}