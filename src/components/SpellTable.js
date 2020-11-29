import { red } from '@material-ui/core/colors';
import React, { Component , Fragment} from 'react'
import { Input, Button } from "reactstrap";

var counter = 10;
class SpellTable extends React.Component {
    constructor(props){
        super()
        this.state = {
            loading: true,
            counter: counter,
        }
    }
   
    componentDidMount(){
        this.setState({loading: false, counter: counter})
    }
    render(){
        //console.log(this.props)
        var spellsArray = this.props.spellInfo;
        var rows = [];
        var nameList = new Array();
        for (let i =0; i<spellsArray.length; i++) {
            this.props.classes_filter.map(class_filter => {
                this.props.schools_filter.map(school_filter => {
                    this.props.levels_filter.map(level_filter => {
                        if (spellsArray[i].level.includes(level_filter.level) && spellsArray[i].school.includes(school_filter.school) && spellsArray[i].dnd_class.includes(class_filter.class) && class_filter.checked && school_filter.checked && level_filter.checked) {
                            if(nameList.includes(spellsArray[i].name)) {
                            } else {
                                nameList.push(spellsArray[i].name)
                                rows.push(
                                <tr>
                                    <td><a href={"https://open5e.com/spells/" + spellsArray[i].slug}>{spellsArray[i].name}</a></td>
                                    <td>{spellsArray[i].school}</td>
                                    <td>{spellsArray[i].level}</td>
                                    <td>{spellsArray[i].components}</td>
                                    <td>{spellsArray[i].dnd_class}</td>
                                </tr>
                                )
                            }
                            
                        }
                    })
                }) 
            })
        }
        return (
            
            <tr>
                {this.state.loading ? <p>carregando</p> : 
                    <div>
                        <thead>
                            <tr>
                                <th><Input type="text" onChange={this.props.allCallbacks.filter.func} value={this.props.allCallbacks.filter.state} /></th>
                                <th><Button id="filter" onClick={this.props.allCallbacks.searchSpell}>Search</Button></th>
                            </tr>
                            <th colspan="4" ><Button style = {{backgroundColor: "#808080",color : "#FFFFFF"}} outline value="prev" onClick={this.props.allCallbacks.previous}>Previous</Button></th>
                            <th><Button style = {{backgroundColor: "#808080",color : "#FFFFFF"}} outline value="next" onClick={this.props.allCallbacks.next}>Next</Button></th>
                            <tr>
                                <th><Button outline value="name" onClick={this.props.allCallbacks.check}>Name</Button></th>
                                <th><Button outline value="school" onClick={this.props.allCallbacks.check}>school</Button></th>
                                <th><Button outline value="level" onClick={this.props.allCallbacks.check}>Level</Button></th>
                                <th><Button outline value="component" onClick={this.props.allCallbacks.check}>Component</Button></th>
                                <th><Button outline value="class" onClick={this.props.allCallbacks.check}>Class</Button></th>
                            </tr>
                        </thead>
                        <tbody>               
                            {rows}
                        </tbody>
                        <th colspan="4" ><Button style = {{backgroundColor: "#808080",color : "#FFFFFF"}} outline value="prev" onClick={this.props.allCallbacks.previous}>Previous</Button></th>
                        <th><Button style = {{backgroundColor: "#808080",color : "#FFFFFF"}} outline value="next" onClick={this.props.allCallbacks.next}>Next</Button></th>

                    </div>
                }
            </tr>
        )
    }
} 

export default (SpellTable)