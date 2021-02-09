import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NoteIcon from '@material-ui/icons/Note';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent:'center',
    alignItems:'center',
    marginLeft:'auto',
    marginRight:'auto',
    width: '78%',
    borderRadius:'5px',
    backgroundColor: theme.palette.background.paper,
  },
  rootTable: {
      margin:0,
      width:'100%',
      height:'auto',
      padding:'25px'

  }
}));

export default function TableFactura(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar className={classes.root} position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
        >
          <Tab label="Nueva factura" icon={<NoteAddIcon />} {...a11yProps(0)} />
          <Tab label="Ver factura" icon={<SlideshowIcon />} {...a11yProps(1)} />
          <Tab label="Informe de facturas" icon={<NoteIcon />} {...a11yProps(2)} />
          <Tab label="Facturas por cobrar" icon={<MonetizationOnIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.rootTable} value={value} index={0}>
        <Paper elevation={3}>
            {props.nuevaFactura}
        </Paper>
      </TabPanel>
      <TabPanel className={classes.rootTable}  value={value} index={1}>
        <Paper elevation={3}>
            {props.verFactura}
        </Paper>
        
      </TabPanel>
      <TabPanel className={classes.rootTable}  value={value} index={2}>
        
        <Paper elevation={3}>
            {props.informesFactura}
            
        </Paper>
      </TabPanel>
      <TabPanel className={classes.rootTable}  value={value} index={3}>
        
        <Paper elevation={3}>
            <h2>Hola</h2>
            
        </Paper>
      </TabPanel>
     
    </div>
  );
}
