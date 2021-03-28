import { useState, useEffect } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import { ToastContainer, toast } from "react-toastify";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {reporte} from "../Services/reporte"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {StyledMenu, StyledMenuItem, useStyles} from '../styles/ReporteStyle';
export default function BotonReporte(props){
  const [anchorEl, setAnchorEl] = useState(null);
  const estilo = useStyles();
 
  
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    return(
        <>
        <ToastContainer />
        <div className="table">
            <h1>{props.title}</h1>
            {props.form}
            <br></br>
            <div className="grid">
                <div>
                    <label className="buscar">
                        <input id="search" type="text" onChange={props.buscar} placeholder="Buscar" />
                        <button className="button">
                            {" "}
                            <i className="icon">
                            {" "}
                            <SearchIcon />
                            </i>
                        </button>
                    </label>
                </div>
  
            <div className="center-table">
              <Button
                id="btn-reportes"
                backgroundColor= '#FFB400'
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
            
                onClick={handleClick}
              >
                <GetAppIcon />
                Reportes
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <StyledMenuItem>
                  <ListItemIcon>
                  <Button onClick={()=>reporte(props.idTable,props.title)}>
                  <PictureAsPdfIcon fontSize="medium" style={{color:'black'}}/>
                  
                  </Button>
                    
                  </ListItemIcon>
                  <ListItemText primary="Descargar en PDF" />
                </StyledMenuItem>
                
                <StyledMenuItem>
                  <ListItemIcon>
                  
                  <img className="img-excel" src="/excel.png" width="20px" height="20px"/>
                  <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button"
                      table= {props.idTable}
                      filename={props.title}
                      sheet="tablexls"
                      buttonText="Descargar en EXCEL"
                      backgroundColor="#2B2B2B7E"
                      />
                 
                    
                  </ListItemIcon>
                 
                </StyledMenuItem>
              </StyledMenu>
            </div>
            
          </div>
          </div>
  </>
    )
}