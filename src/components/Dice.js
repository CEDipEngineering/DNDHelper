import React, { Component , Fragment} from 'react'
import { Input, Button } from "reactstrap";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactTooltip from "react-tooltip";
import Tooltip from '@material-ui/core/Tooltip';


class Dice extends React.Component {
    constructor(props){
        super()
        this.state = {
            loading: true,
            setOpen: false,
        }
        this.number = 0
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.roll = this.roll.bind(this);
        

    }

    roll(){
        return Math.floor(Math.random() * this.props.number) + 1
    }


    componentDidMount(){
        this.setState({loading: false})
    }

    handleClick(){
        this.number = this.roll();
        this.setState(
            {setOpen: true}
        )
    };
    
    handleClose(event, reason){
        if (reason === 'clickaway') {
          return;
        }
        this.setState({setOpen: false})
      };

    render(){
        return (
        <React.Fragment>
      <Tooltip title={"Dice " + this.props.number}>

            <IconButton id={"Dice"} onClick={this.handleClick}></IconButton>
        </Tooltip>

            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={this.state.setOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message={"Your rolled a d" + this.props.number +  " for a: " + this.number}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    
                </React.Fragment>
                }
            />
        </React.Fragment>
        )
    }

}
    //  Placeholder image of Dice
    // https://i.ibb.co/HzKKBMg/Clipart-Key-339726.png

export default (Dice)