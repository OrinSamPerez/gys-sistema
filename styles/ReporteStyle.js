import { makeStyles } from "@material-ui//core/styles";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem"; 
export const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  
 export  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: '#2B2B2B7E',
        color:'#F6F6F6',
      },
    },
  }))(MenuItem);
  
export  const useStyles = makeStyles((theme) => ({
    ubicar: {
      textAlign: "center",
      justifyAlign: "center",
      alignItems: "center",
      paddingLeft: "40%",
    },
  }));
  