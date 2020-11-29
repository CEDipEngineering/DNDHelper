import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React from 'react'
import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Button, ListGroup, ListGroupItem, Input, Row, Col, Form, FormGroup, Label, Collapse, ButtonGroup } from "reactstrap";

class REG extends React.Component {
    constructor(props){
        super()
        this.state = {
            n: 0,
            cr: 0,
            name: "",
            data: [],
            user: [],
            newEnc: [],
            loading: true
        }
    
        this.saveEncouter = this.saveEncounter.bind(this);
        this.makeRandomEncounter = this.makeRandomEncounter.bind(this);
    };

    componentDidMount() {
        this.setState({
            n: this.props.n,
            cr: this.props.cr,
            name: this.props.name,
            data: this.props.data,
            user: this.props.user,
            loading: false
        })
    }

    saveEncounter(event) {
        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
           axios.put(url, this.state.user)
               .then(resp => {
                   this.setState((state) => {
                       state.user = resp.data
                   })
                   event.preventDefault();
                   this.forceUpdate();
               })
               .catch(error => {
                   console.log("error",error)
               })
   };
   
    makeRandomEncounter(event) {
        const name = this.state.name;
        const n = this.state.n;
        const cr = this.state.cr;
        let newEnc;
        if (n==0 || cr==0 || name==""){
            alert("fill all informations");
            this.forceUpdate();
            event.preventDefault();
        }else{
            //  Horribly inneficient; Replace with filter, shuffle, and splice.
            // for (let i = 0; i<n; i++) {
            //     monster = monsterList[Math.floor(Math.random() * 50)];
            //     if (monster.challenge_rating === cr){
            //         randomMonsters.push(monster)
            //     }else{
            //         i--;
            //     };
            // };
            // Keep only ones with correct cr
            let monsterList = this.state.data.filter(monster => monster.challenge_rating == this.state.cr);
            // TODO: Implement scenario where monsterList length is 0
            // Shuffle array then get slice from 0 to n
            let randomMonsters = monsterList.sort(() => 0.5 - Math.random()).splice(0,n);
            const encounters = this.state.user.encounters;
            newEnc =  {
                "name": name,
                "monsters": randomMonsters,
                "isOpen": true
            };
            encounters.push(newEnc);
            this.setState((state) => {
                state.user.encounters = encounters;
                state.encSelected = newEnc.name;
            });
        }
        event.preventDefault();
        this.setState({newEnc: newEnc})
        return (newEnc);
    };

    render() {
        if (!this.state.loading){
        return(
            <FormGroup className="REG">

                <h5> Generate Random Encounter </h5>
                
                Encounter Name: <input type="text"
                onChange={(e) => {
                    this.setState({name: e.target.value})}
                }/><br />
                Amount of monsters: <input type="number"
                onChange={(e) => {this.setState({n: e.target.value})}} 
                min="1" max="10"/><br />
                Select cr of monsters: <input type="number" 
                onChange={(e) => {this.setState({cr: e.target.value})}}
                min="0" max="9"/><br />

                <button onClick={(e) => {
                    let enc = this.makeRandomEncounter(e)
                    this.saveEncounter(enc)}
                }> load encounter </button>
            </FormGroup>
    )}else{
        return(<p> loading... </p>)
    }
}}

export default (REG)