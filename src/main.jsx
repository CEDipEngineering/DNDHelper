import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import React, { Component } from 'react'
import { Table, Container, TabContent, TabPane, Nav, NavItem, NavLink, Button, ListGroup, Input, Row, Col, Form, FormGroup } from "reactstrap";
import classnames from 'classnames';
import MonsterTable from './components/MonsterTable'
import SpellTable from './components/SpellTable'
import EncounterRow from './components/EncounterRow'
import AccountSettings from './components/AccountSettings'
import REG from './components/REG'
import Dice from './components/Dice'
import "./filter.css"
var classesList = new Array();

export default class Login extends Component {
    constructor(props) {
        super(props);
        let stdSel = "";
        if (this.props.state.user.encounters != null) {
            if (this.props.state.user.encounters.length > 0) {
                stdSel = this.props.state.user.encounters[0].name
            }
        }

        this.state = {
            classes: [
                { class: 'Barbarian', checked: true },
                { class: 'Bard', checked: true },
                { class: 'Cleric', checked: true },
                { class: 'Druid', checked: true },
                { class: 'Fighter', checked: true },
                { class: 'Monk', checked: true },
                { class: 'Paladin', checked: true },
                { class: 'Ranger', checked: true },
                { class: 'Rogue', checked: true },
                { class: 'Sorcerer', checked: true },
                { class: 'Warlock', checked: true },
                { class: 'Wizard', checked: true }
            ],
            schools: [
                { school: 'Conjuration', checked: true },
                { school: 'Necromancy', checked: true },
                { school: 'Evocation', checked: true },
                { school: 'Abjuration', checked: true },
                { school: 'Transmutation', checked: true },
                { school: 'Divination', checked: true },
                { school: 'Enchantment', checked: true },
                { school: 'Illusion', checked: true }
            ],
            levels: [
                { level: '1st-level', checked: true },
                { level: '2nd-level', checked: true },
                { level: '3rd-level', checked: true },
                { level: '4th-level', checked: true },
                { level: '5th-level', checked: true },
                { level: '6th-level', checked: true },
                { level: '7th-level', checked: true },
                { level: '8th-level', checked: true },
                { level: 'Cantrip', checked: true }
            ],
            listMonsters: [],
            data: [],
            dataSpell: [],
            page: 1,
            aapple: {
                "name": "Aapple",
                "type": "fruit",
                "alignment": "full neutral",
                "challenge_rating": 0,
                "hit_points": "69",
                "hit_dice": "4d20+2"
            },
            activeTab: "1",
            encounter: {},
            newEncounter: {
                "name": "",
                "monsters": [],
                "isOpen": false
            },
            user: this.props.state.user,
            loggedUser: this.props.state.user.username,
            // dpOpen: false
            encSelected: stdSel,
            check: {
                "type": false,
                "alignment": false
            },
            monsterUrl: "https://api.open5e.com/monsters/?search=",
            spellUrl: "https://api.open5e.com/spells/?search=",
            filter: "",
            filtering: "",
            proceed: true,

            randomEncouterName: "",
            cr: 0,
            n: 0,
            randomMonsters: [],
            idList: [],
            refresh: false

        }

        axios.get("https://api.open5e.com/classes/")
            .then((response) => {
                var obj = response.data.results;

                var len = obj.length;
                for (var i = 0; i < len; i++) {
                    var name = obj[i].name;
                    classesList.push(name)
                }
            })
        console.log("CLASSES: ", classesList)


        // console.log("encounter selected: ", this.state.encSelected)
        this.getMonsters = this.getMonsters.bind(this);
        this.getSpells = this.getSpells.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.newEncounter = this.newEncounter.bind(this);
        this.handleEncounter = this.handleEncounter.bind(this);
        this.changeEncounter = this.changeEncounter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSchool = this.handleSchool.bind(this);
        this.handleLevel = this.handleLevel.bind(this)
        this.editInfo = this.editInfo.bind(this);
        this.deleteEncounter = this.deleteEncounter.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.removeMonster = this.removeMonster.bind(this);
        this.handleMonsterLife = this.handleMonsterLife.bind(this);
        this.checkMonster = this.checkMonster.bind(this);
        this.checkSpell = this.checkSpell.bind(this);
        this.filter = this.filter.bind(this);
        this.search = this.search.bind(this);
        this.searchSpell = this.searchSpell.bind(this);
        this.sleep = this.sleep.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this)
    }

    async checkMonster(event) {
        this.setState({ proceed: false })
        await this.sleep(1000)
        this.setState(state => {
            state.data = []
            state.proceed = true
        })
        var name = event.target.value
        var url = "https://api.open5e.com/monsters/?ordering=" + name
        this.getMonsters(url)
    }

    async checkSpell(event) {

        this.setState({ proceed: false })
        await this.sleep(1000)
        this.setState(state => {
            state.dataSpell = []
            state.proceed = true
        })
        var name = event.target.value
        var url = "https://api.open5e.com/spells/?ordering=" + name
        this.getSpells(url)
    }

    handleRefresh() {
        this.setState({ refresh: true })
        this.forceUpdate();
    }

    filter(event) {
        var handleState = (state, event) => {
            var filter = event.target.value
            state.filter = filter
        }
        this.setState(handleState(this.state, event))
        this.forceUpdate()
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async search() {
        this.setState(state => {
            state.proceed = false
        })
        await this.sleep(1000)

        this.setState(state => {
            state.data = []
            state.proceed = true
        })

        this.getMonsters(this.state.monsterUrl + this.state.filter)
    }

    async searchSpell() {
        this.setState(state => {
            state.proceed = false
        })
        await this.sleep(1000)

        this.setState(state => {
            state.data = []
            state.proceed = true
        })
        var obj_debug = this.state.spellUrl + this.state.filter
        console.log("oi", obj_debug)
        this.getSpell(this.state.spellUrl + this.state.filter)
    }


    getMonsters(url) {
        axios.get(url)
            .then(resp => {
                var { data } = this.state
                var newdata = data.concat(resp.data.results)
                this.setState({
                    data: newdata
                })
                url = resp.data.next
                var proceed = this.state.proceed
                if (url && proceed) {
                    this.getMonsters(url)
                }
            })
    }

    getSpells(url) {
        console.log(url)
        axios.get(url)
            .then(resp => {
                console.log(resp.data.results)
                var { dataSpell } = this.state
                // console.log("response of getmonster", resp.data.results)
                var newdata = dataSpell.concat(resp.data.results)
                //console.log("dataSpell",dataSpell)
                this.setState({
                    dataSpell: newdata
                })
                // url = resp.data.next
                // var proceed = this.state.proceed
                // console.log("URL", url)
                // if (url && proceed) {
                //     this.getSpells(url)
                // }
            })
    }

    nextPage(event) {

        var handleState = (state, event) => {
            state.page = state.page + 1
            state.dataSpell = []
        }
        this.setState(handleState(this.state, event))
        this.forceUpdate()
        var url = "https://api.open5e.com/spells/?page=" + this.state.page
        this.getSpells(url)
        console.log(url)
    }


    previousPage(event) {
        var handleState = (state, event) => {
            state.page = state.page - 1
            state.dataSpell = []
        }
        this.setState(handleState(this.state, event))
        this.forceUpdate()
        var url = "https://api.open5e.com/spells/?page=" + this.state.page
        this.getSpells(url)
        console.log(url)
    }

    componentDidMount() {

        var url = "https://api.open5e.com/monsters/"
        var urls = "https://api.open5e.com/spells/"
        this.getMonsters(url)
        this.getSpells(urls)
    }

    toggleCollapse(nombre) {
        var encounters = this.state.user.encounters
        for (var i in encounters) {
            // console.log("iteração de n:", i)
            if (encounters[i].name === nombre) {
                // console.log("entrou na condição")
                let open = this.state.user.encounters[i].isOpen
                let index = i
                this.setState(state => {
                    state.user.encounters[index].isOpen = !open
                })
            }

        }
        this.forceUpdate()
        // console.log("what", this.state.user.encounters)
    }

    toggle(tab) {
        // console.log("tab: ", tab)
        // console.log("condition", (this.state.activeTab !== tab))
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
            // console.log("state", this.state)
        }

    }

    newEncounter() {
        const encounters = this.state.user.encounters
        const newEnc = this.state.newEncounter
        encounters.push(newEnc)
        this.setState((state) => {
            state.user.encounters = encounters
            state.encSelected = newEnc.name
        })

        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
        axios.put(url, this.state.user)
            .then(resp => {
                // console.log("resp", resp.data)
                this.setState((state) => {
                    state.user = resp.data
                })
            })
            .catch(error => {
                // console.log("error",error)
            })
        this.forceUpdate();
    }

    handleEncounter(event) {
        var handleState = (state, event) => {
            state.newEncounter.name = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("state", this.state)
    }

    changeEncounter(event) {
        var handleState = (state, event) => {
            state.encSelected = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("encounter selected", this.state.encSelected)
    }

    handleFilter(event) {
        var handleState = (state, event) => {
            state.classes.find(obj => obj.class == event.target.name).checked = event.target.checked
            var name = event.target.name
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("state on change", this.state)
    }

    handleSchool(event) {
        var handleState = (state, event) => {
            state.schools.find(obj => obj.school == event.target.name).checked = event.target.checked
            var name = event.target.name
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("state on change", this.state)
    }

    handleLevel(event) {
        var handleState = (state, event) => {
            state.levels.find(obj => obj.level == event.target.name).checked = event.target.checked
            var name = event.target.name
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("state on change", this.state)
    }

    handleChange(event) {
        var handleState = (state, event) => {
            var name = event.target.name
            state.user[name] = event.target.value
            return state
        }
        this.setState(handleState(this.state, event))
        // console.log("state on change", this.state)
    }

    editInfo(event) {
        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
        axios.put(url, this.state.user)
            .then(resp => {
                this.setState((state) => {
                    state.user = resp.data
                    state.loggedUser = resp.data.username
                })
            })
            .catch(error => {
                console.log("error", error)
            })
        this.forceUpdate();
    }

    deleteEncounter(event) {
        const name = event.target.value
        const encs = this.state.user.encounters
        // console.log("encounters: ", encs)
        const index = encs.map(enc => { return enc.name }).indexOf(name)
        // console.log("index", index)
        encs.splice((index), 1)
        // console.log("encounters updated: ", encs)
        // console.log("state", this.state)
        this.setState(state => {
            state.user.encounters = encs
        })
        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
        axios.put(url, this.state.user)
            .then(resp => {
                this.setState((state) => {
                    state.user = resp.data
                })
            })
            .catch(error => {
                console.log("error", error)
            })
        this.forceUpdate();

    }

    addMonster(event) {
        var name = event.target.value
        var selected = this.state.encSelected
        var encounters = this.state.user.encounters
        var url = "https://api.open5e.com/monsters/?name=" + name
        // console.log("url", url)
        // console.log("user encounters", encounters)
        axios.get(url)
            .then(resp => {
                for (var i in encounters) {
                    if (encounters[i].name === selected) {
                        encounters[i].monsters.push(resp.data.results[0])
                    }
                }
                // console.log("encounters", encounters)
                this.setState(state => {
                    state.user.encounters = encounters
                })
                // console.log("user do state", this.state)
                var url1 = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id
                axios.put(url1, this.state.user)
                    .then(resp => {
                        // console.log("state user", this.state.user)
                        this.setState((state) => {
                            state.user = resp.data
                        })
                    })
                    .catch(error => {
                        console.log("error", error)
                    })

            })
            .catch(err => console.log("error", err))
        // console.log("user dps da req", this.state.user)

    }

    removeMonster(event) {
        // console.log("removeEvent: ", event)
        const encounterName = event.target.id
        const monsterName = event.target.value
        // console.log("nome do encontro", encounterName)
        // console.log("nome do monstro", monsterName)
        const encs = this.state.user.encounters
        const index = encs.map(enc => { return enc.name }).indexOf(encounterName)
        const encounterMonsters = encs[index].monsters
        const indexOfMonster = encounterMonsters.map(monst => { return monst.name }).indexOf(monsterName)
        // console.log("index do monstro", indexOfMonster)
        encounterMonsters.splice(indexOfMonster, 1)

        this.setState(state => {
            state.user.encounters = encs
        })

        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id

        axios.put(url, this.state.user)
            .then(resp => {
                this.setState((state) => {
                    state.user = resp.data
                })
            })
            .catch(error => {
                console.log("error", error)
            })
        this.forceUpdate();
    }

    handleMonsterLife(event) {
        const encounterName = event.target.id
        const monsterName = event.target.name
        const encs = this.state.user.encounters
        const index = encs.map(enc => { return enc.name }).indexOf(encounterName)
        const encounterMonsters = encs[index].monsters
        const indexOfMonster = encounterMonsters.map(monst => { return monst.name }).indexOf(monsterName)
        var handleState = (state, event) => {
            state.user.encounters[index].monsters[indexOfMonster].hit_points = event.target.value
        }
        this.setState(handleState(this.state, event))

        var url = "https://backend-dnd.herokuapp.com/users/user/" + this.state.user._id

        axios.put(url, this.state.user)
            .then(resp => {
                console.log("resp", resp.data)
                this.setState((state) => {
                    state.user = resp.data
                })
            })
            .catch(error => {
                console.log("error", error)
            })
        this.forceUpdate();
    }

    render() {


        var monstersArray = this.state.data
        var tableMonsters = <MonsterTable monsterInfo={monstersArray}
            allCallbacks={{
                filter: {
                    func: this.filter,
                    state: this.state.filter
                },
                search: this.search,
                check: this.checkMonster,
                addMonster: this.addMonster
            }} />;

        var spellsArray = this.state.dataSpell
        var tableSpells = <SpellTable levels_filter={this.state.levels} schools_filter={this.state.schools} classes_filter={this.state.classes} spellInfo={spellsArray} allCallbacks={{ filter: { func: this.filter, state: this.state.filter }, search: this.searchSpell, check: this.checkSpell, next: this.nextPage, previous : this.previousPage }} />;


        var encountersArray = this.state.user.encounters
        var tableEncounters = <EncounterRow encounterInfo={encountersArray}
            allCallbacks={{
                handleLife: this.handleMonsterLife,
                remove: this.removeMonster,
                toggleCollapse: this.toggleCollapse,
                deleteEncounter: this.deleteEncounter
            }}
            refresh={this.state.refresh} />

        // console.log(encountersArray)
        var selectEncounters = [];
        if (encountersArray) {
            for (let i = 0; i < encountersArray.length; i++) {
                selectEncounters.push(<option>{encountersArray[i].name}</option>)
            }
        }

        // console.log("props", this.props)
        // console.log("tableMonsters:", tableMonsters)
        // console.log("props state: ", this.props.state)
        const settingsPage = <AccountSettings state={this.props.state} allCallbacks={{ handleChange: this.handleChange, editInfo: this.editInfo }} />


        const activeTab = this.state.activeTab
        // console.log("activeTab: ", activeTab)

        /* For every dice, we should do this: 
        <Col>
            <Dice></Dice>
        </Col>
        
        Random numbers: Math.floor(Math.random() * 10) + 1;  // returns a random integer from 1 to 10
        */

        const diceList = []

        diceList.push(
            <Col className="d4">
                <Dice number={4} ></Dice>
            </Col>)

        diceList.push(
            <Col className="d6">
                <Dice number={6}></Dice>
            </Col>)

        diceList.push(
            <Col className="d8">
                <Dice number={8}></Dice>
            </Col>)

        diceList.push(
            <Col className="d10">
                <Dice number={10} ></Dice>
            </Col>)

        diceList.push(
            <Col className="d12">
                <Dice number={12} ></Dice>
            </Col>)

        diceList.push(
            <Col className="d20">
                <Dice number={20} ></Dice>
            </Col>)


        var renderREG;
        if (this.state.data.length == 1086) {
            renderREG = <REG user={this.state.user}
                data={this.state.data}
                handleRefresh={this.handleRefresh} />

        } else {
            renderREG = <p> loading... </p>
        }
        return (
            <div>
                <Nav tabs style={{ marginBottom: "1rem" }}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            {this.props.state.loggedStatus ? this.props.state.user.username : "Log In"}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Monster List
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Spell List
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                        >
                            Encounters
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Container>
                            <Row>
                                <Col sm="12">
                                    <h4>Account Settings</h4>
                                    {settingsPage}
                                </Col>
                            </Row>
                        </Container>
                    </TabPane>
                    <TabPane tabId="3">
                        <Container>
                            <div className="big-container">
                                <div className="little-container">
                                    {this.state.classes.map(classe => {
                                        return (
                                            <div>
                                                <input type="checkbox" name={classe.class} checked={this.state.classes.find(obj => obj.class == classe.class).checked} onChange={this.handleFilter} />
                                                {classe.class}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="little-container">
                                    {this.state.schools.map(school => {
                                        return (
                                            <div>
                                                <input type="checkbox" name={school.school} checked={this.state.schools.find(obj => obj.school == school.school).checked} onChange={this.handleSchool} />
                                                {school.school}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="little-container">
                                    {this.state.levels.map(level => {
                                        return (
                                            <div>
                                                <input type="checkbox" name={level.level} checked={this.state.levels.find(obj => obj.level == level.level).checked} onChange={this.handleLevel} />
                                                {level.level}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <Table borderless striped>
                                {tableSpells}
                            </Table>
                        </Container>
                    </TabPane>
                    <TabPane tabId="2">
                        <Container>
                            <Input type="select" onChange={this.changeEncounter}> {selectEncounters} </Input>
                            <Table borderless striped>
                                {tableMonsters}
                            </Table>
                        </Container>
                    </TabPane>
                    <TabPane tabId="4">
                        <Container>
                            <Row>
                                <Col sm="12">
                                    <h4>Encounters List</h4>
                                    <Form>
                                        <FormGroup>
                                            <Input type="text" placeholder="Your new encounter" value={this.state.newEncounter.name}
                                                onChange={this.handleEncounter} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="success" onClick={this.newEncounter}>Add Encounter</Button>
                                        </FormGroup> <br />
                                    </Form>

                                    <Form>
                                        {renderREG}
                                    </Form>
                                    <ListGroup>
                                        {tableEncounters}

                                    </ListGroup>

                                </Col>
                            </Row>
                        </Container>
                        <Container className="dieDiv">
                            <div>
                                <h5 id="diceHeader">Roll Dice</h5>
                                <Container>
                                    <Row>
                                        {diceList}
                                    </Row>
                                    <p id="imgSrc">Images from <a href={"https://thenounproject.com/"}>The Noun Project</a></p>
                                </Container>
                            </div>
                        </Container>
                    </TabPane>
                </TabContent>

            </div>
        )
    }
}
