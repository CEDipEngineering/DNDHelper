import React, { Component , Fragment} from 'react'
import { Input, Button } from "reactstrap";


class SpellTable extends React.Component {
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
        //console.log(this.props)
        var spellsArray = this.props.spellInfo;
        var rows = [];
        for (let i =0; i<spellsArray.length; i++) {
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
        return (
            
            <tr>
                {this.state.loading ? <p>carregando</p> : 
                    <div>
                        <thead>
                            <tr>
                                <th><Input type="text" onChange={this.props.allCallbacks.filter.func} value={this.props.allCallbacks.filter.state} /></th>
                                <th><Button id="filter" onClick={this.props.allCallbacks.search}>Search</Button></th>
                            </tr>
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
                    </div>
                }
            </tr>
        )
    }
} 

export default (SpellTable)