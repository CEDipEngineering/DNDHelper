import React, { Component } from'react';
import PropTypes from "prop-types";
import MonsterTable from "./MonsterTable.js";
import { shallow } from 'enzyme';
import { RedditShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';


const rendered = shallow(<MonsterTable allCallbacks = {{alguma:"coisa", filter:{func:"filter"}}} monsterInfo={[{slug:"pekora", name:"Usada Pekora", size:"Small", type:"humanoid", alignment:"chaotic neutral", challenge_rating:"2", hit_points:7, hit_dice:"2d6" }]}/>);
const state = rendered.instance().state;

it("should create Reddit share button with monster url from api database", () => {
    // const pagina = mount(<MonsterTable {...props}/>);
    // expect(rendered.querySelector("RedditShareButton").getAttribute("url")).toBe("https://open5e.com/monsters/pekora")
    expect(rendered.find(RedditShareButton).props().url).toEqual("https://open5e.com/monsters/pekora");
})

it("should create Facebook share button with monster url from api database", () => {
    // const pagina = mount(<MonsterTable {...props}/>);
    // expect(rendered.querySelector("RedditShareButton").getAttribute("url")).toBe("https://open5e.com/monsters/pekora")
    expect(rendered.find(FacebookShareButton).props().url).toEqual("https://open5e.com/monsters/pekora");
})

it("should create Twitter share button with monster url from api database", () => {
    // const pagina = mount(<MonsterTable {...props}/>);
    // expect(rendered.querySelector("RedditShareButton").getAttribute("url")).toBe("https://open5e.com/monsters/pekora")
    expect(rendered.find(TwitterShareButton).props().url).toEqual("https://open5e.com/monsters/pekora");
})
