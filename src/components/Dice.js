import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


class Dice extends React.Component {
    constructor(props) {
        super()
        this.state = {
            loading: true,
            // setOpen: false,
            count: 1,
        }
        this.number = ""
        this.roll = this.roll.bind(this);
        this.upCount = this.upCount.bind(this);
        this.dropCount = this.dropCount.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    roll() {
        return Math.floor(Math.random() * this.props.number) + 1
    }

    handleClick(){
        let curr = 0;
        for (let i = 0; i<this.state.count; i++){
            curr += this.roll();
        }
        this.number = curr;
        this.setState(
            {setOpen: true}
        )
    };

    componentDidMount() {
        this.setState({ loading: false })
    }

    upCount(event){
        this.setState({
            count: this.state.count + 1
        });
    }

    dropCount(event){
        this.setState({
            count: this.state.count - 1
        });
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <input className={"dieSelector"} type="number" value={this.state.count} 
                    onChange={(e) => {this.setState({count: e.target.value})}}></input>
                </form>
                <Tooltip title={"Dice " + this.props.number}>
                    <IconButton id={"Dice"} onClick={this.handleClick}></IconButton>
                </Tooltip>
                <p>Result: {this.number}</p>
            </React.Fragment>
        )
    }

}
//  Placeholder image of Dice
// https://i.ibb.co/HzKKBMg/Clipart-Key-339726.png

export default (Dice)