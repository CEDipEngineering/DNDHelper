import React, { Component , Fragment} from 'react'
import { Input, Button } from "reactstrap";


class Dice extends React.Component {
    constructor(props){
        super()
        this.state = {
            loading: true,
        }

    }

    componentDidMount(){
        this.setState({loading: false})
    }

    render(){
        return <button id={"Dice"}></button>
    }

}
    //  Placeholder image of Dice
    // https://i.ibb.co/HzKKBMg/Clipart-Key-339726.png

export default (Dice)