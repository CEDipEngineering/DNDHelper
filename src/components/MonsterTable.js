import React from 'react'
import { Input, Button } from "reactstrap";
import { FacebookShareButton, 
         RedditShareButton, 
         TwitterShareButton, 
         WhatsappShareButton, 
         EmailShareButton, 
         FacebookIcon, 
         RedditIcon, 
         EmailIcon, 
         TwitterIcon, 
         WhatsappIcon , 
         TelegramShareButton , 
         TelegramIcon } from 'react-share';


class MonsterTable extends React.Component {
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
        var monstersArray = this.props.monsterInfo;
        var rows = [];
        for (let i =0; i<monstersArray.length; i++) {
            rows.push(
                <tr>
                    <td><a href={"https://open5e.com/monsters/" + monstersArray[i].slug}>{monstersArray[i].name}</a></td>
                    <td>
                        <div> {/* more buttons inside this */}
                            <RedditShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <RedditIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </RedditShareButton>
                            <FacebookShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <FacebookIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </FacebookShareButton>
                            <TwitterShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <TwitterIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </TwitterShareButton>
                            <WhatsappShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <WhatsappIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </WhatsappShareButton>
                            <EmailShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <EmailIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </EmailShareButton>
                            <TelegramShareButton title={monstersArray[i].name} url={"https://open5e.com/monsters/" + monstersArray[i].slug}>
                                <TelegramIcon size={"2rem"} round={true} borderRadius={"9px"} />
                            </TelegramShareButton>
                        </div>
                    </td>
                    <td>{monstersArray[i].type}</td>
                    <td>{monstersArray[i].alignment}</td>
                    <td>{monstersArray[i].challenge_rating}</td>
                    <td>{monstersArray[i].hit_points}/{monstersArray[i].hit_dice}</td>
                    <td><Button color="success" value={monstersArray[i].name} onClick={this.props.allCallbacks.addMonster}>+</Button></td>
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
                                <th><Button outline disable>Share</Button></th>
                                <th><Button outline value="type" onClick={this.props.allCallbacks.check}>Type</Button></th>
                                <th><Button outline value="alignment" onClick={this.props.allCallbacks.check}>Alignment</Button></th>
                                <th><Button outline value="challenge_rating" onClick={this.props.allCallbacks.check}>CR</Button></th>
                                <th><Button outline value="hit_points" onClick={this.props.allCallbacks.check}>Hit Points</Button></th>
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

export default (MonsterTable)