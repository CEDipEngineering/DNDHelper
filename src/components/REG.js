import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React from 'react'
import { FormGroup } from "reactstrap";

class REG extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            n: 0,
            cr: 0,
            name: "",
            data: [],
            user: [],
            newEnc: [],
            loading: true
        }
        this.makeRandomEncounter = this.makeRandomEncounter.bind(this)
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
    
    makeRandomEncounter(event) {
        const name = this.state.name;
        const n = this.state.n;
        const cr = this.state.cr;
        const monsterList = this.state.data;
        let randomMonsters = [];
        let newEnc = [];
        if (n==undefined || name==undefined || n==0 || name==""){
            alert("fill all informations");
        }else{
            for (let i = 0; i<n; i++) {
                const monster = monsterList[Math.floor(Math.random() * monsterList.length)];
                
                if (monster.challenge_rating == cr){
                    randomMonsters.push(monster)
                }else{
                    i--;
                };
            };
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

            this.setState({newEnc: newEnc})
     
            var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
            axios.put(url, this.state.user)
                .then(resp => {
                    this.setState((state) => {
                        state.user = resp.data
                    })
                })
                       
                .catch(error => {
                    console.log("error",error)
                })
            this.setState({refresh: true})
        }
        event.preventDefault();
        this.forceUpdate();
    };
    render() {
        if (!this.props.loading){
        
            return(
                <FormGroup className="REG">

                    <h5> Random Encounter Generator</h5>
                    
                    Encounter Name: <input type="text"
                    onChange={(e) => {
                        this.setState({name: e.target.value})}
                    }/><br />
                    Amount of monsters: <input type="number"
                    onChange={(e) => {this.setState({n: e.target.value})}} 
                    min="1" max="10"/><br />

                    Select cr of monsters: <select 
                    onChange={(e) => {this.setState({cr: e.target.value})}}
                    min="0" max="9">
                        <option value="0"> 0 </option>
                        <option value="1/8"> 1/8 </option>
                        <option value="1/4"> 1/4 </option>
                        <option value="1/2"> 1/2 </option>
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                        <option value="4"> 4 </option>
                        <option value="5"> 5 </option>
                        <option value="6"> 6 </option>
                        <option value="7"> 7 </option>
                        <option value="8"> 8 </option>
                        <option value="9"> 9 </option>
                        <option value="10"> 10 </option>
                        <option value="11"> 11 </option>
                        <option value="12"> 12 </option>
                        <option value="13"> 13 </option>
                        <option value="14"> 14 </option>
                        <option value="15"> 15 </option>
                        <option value="16"> 16 </option>
                        <option value="17"> 17 </option>
                        <option value="19"> 19 </option>
                        <option value="20"> 20 </option>
                        <option value="21"> 21 </option>
                        <option value="22"> 22 </option>
                        <option value="23"> 23 </option>
                        <option value="24"> 24 </option>
                        <option value="30"> 30 </option>
                    </select><br />

                    <button onClick={(e) => { 
                                            this.makeRandomEncounter(e);
                                            this.props.handleRefresh();
                                            e.preventDefault();
                                        }}> Create Encounter </button>
                </FormGroup>
        )}else{
            return(<p> loading... </p>)
        }
}}

export default (REG)


