import React, { Component , Fragment} from 'react'
import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Button, ListGroup, ListGroupItem, Input, Row, Col, Form, FormGroup, Label, Collapse, ButtonGroup } from "reactstrap";


class AccountSettings extends React.Component {
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
        let username;
        let accSettings;
        console.log("Account Setting props: ", this.props)
        if (this.props.state.loggedStatus) {
            username = this.props.state.user.username;
            accSettings = 
                <Form>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type="name" name="username" value={username} onChange={this.props.allCallbacks.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>E-mail:</Label>
                        <Input type="email" name="email" value={this.props.state.user.email} onChange={this.props.allCallbacks.handleChange} />
                    </FormGroup>
                    <Button color="primary" onClick={this.props.allCallbacks.editInfo}>Edit Info</Button>
                </Form>
            
        } else {
            username = "Log In"
            accSettings = <Label>Please <Button color="link" onClick={() => { window.location.href = "/login" }}>Log In</Button> to see your info</Label>
        }
        return (
            <div>{accSettings}</div>
        )
    }
} 

export default (AccountSettings)