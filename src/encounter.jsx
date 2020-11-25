import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default class Encounter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monsterList: {},
            cr: 0,
            n: 0
       };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    makeEncounter() {
        var n = this.state.n;
        var cr = this.state.cr;
        var monsterList = this.state.monsterList;
        var idList = [];
        var url = "https://api.open5e.com/monsters/";
        
        for (let i=0; i<=n; i++){
            idList.push(Math.floot((Math.random() * 1086)));
        };

        axios.get(url)
            .then(resp => {
                console.log("Response", resp.data.results)
                for (let monster in resp.data.results){
                    if (Object.keys(monster) in idList){
                        alert(Object.keys(monster));
                        monsterList.push(monster);
                    };
                };
           }).catch(err => console.log("error", err))
    }





    handleChange(event) {
        var handleState = (state, event) => {
            var name = event.target.name
            state.user[name] = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
    }

    render() {
        return (
            <Container>

                Amount of monsters: <input type="number" value={this.state.n}
                onChange={this.handleChange}/><br />
                Select cr of monsters: <input type="number" value={this.state.cr} 
                onChange={this.handleChange}/>
                <button> load encounter </button>
           </Container>
        )
    }
}
