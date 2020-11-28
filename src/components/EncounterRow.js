import React from 'react'
import { Table, 
         Container, 
         Button, 
         ListGroupItem, 
         Input, 
         Collapse, 
         ButtonGroup } from "reactstrap";

class EncounterRow extends React.Component {
    constructor(props) {
        super()
        this.state = {
            loading: true,
        }

    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    render() {
        if (!this.state.loading && this.props.encounterInfo) {
            console.log(this.props)
            var encountersArray = this.props.encounterInfo;
            var rows = [];
            for (let i = 0; i < encountersArray.length; i++) {
                let content = [];
                for (let monster of encountersArray[i].monsters) {
                    content.push(
                        <tr>
                            <td><a href={"https://open5e.com/monsters/" + monster.slug}>{monster.name}</a></td>
                            <td>{monster.armor_class}</td>
                            <td><Input type="text" id={encountersArray[i].name} name={monster.name} value={monster.hit_points} onChange={this.props.allCallbacks.handleLife} /></td>
                            <td>{monster.senses}</td>
                            <td>{monster.languages}</td>
                            <td><Button color="danger" value={monster.name} id={encountersArray[i].name} onClick={this.props.allCallbacks.remove}>-</Button></td>
                        </tr>);
                }
                rows.push(
                    <ListGroupItem>
                        <ButtonGroup>
                            <Button color="info" onClick={() => { this.props.allCallbacks.toggleCollapse(encountersArray[i].name) }} style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}>{encountersArray[i].name}</Button>
                            <Button color="danger" value={encountersArray[i].name} onClick={this.props.allCallbacks.deleteEncounter} style={{ marginBottom: "1rem", marginRight: "0.5rem" }}>Delete</Button>
                        </ButtonGroup>
                        <Collapse isOpen={encountersArray[i].isOpen}>
                            <Container>
                                <Table borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Armor Class</th>
                                            <th>Hit Points</th>
                                            <th>Senses</th>
                                            <th>Languages</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content}
                                    </tbody>
                                </Table>
                            </Container>
                        </Collapse>
                    </ListGroupItem>

                )
            }
        }
        return (

            <div>
                {this.state.loading ? <div></div> :
                    <div>
                        {rows}
                    </div>
                }
            </div>
        )
    }
}

export default (EncounterRow)