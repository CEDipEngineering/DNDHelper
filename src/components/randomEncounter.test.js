import React from "react";
import Enzyme from "enzyme";
import Login from "../main";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import REG from './REG';
import axios from 'axios'
import sampleData from "./sampleData";

configure({ adapter: new Adapter() });

function getMonsters(url) {
    axios.get(url)
         .then(resp => {
            return(resp)
        })
}


describe("REG", () => {
    it("should recieve alert to fill all information", () => {
        const wrapper = mount(
            <REG user = {{"_id":"5fbce8a01e97fe0024cdebeb",
                        "encounters":[],
                        "username":"thiago",
                        "email":"tluigimm@tutanota.com",
                        "createdAt":"2020-11-24T11:04:00.731Z",
                        "__v":0}}
                        data = {sampleData}/>
        );
        wrapper.find("button").simulate("click");
        console.log(wrapper.state())
        let result = wrapper.state().newEnc
        expect(result.monsters.length).toBe(0)
    })

    it("monster shoul always have cr=1", () => {
        const wrapper = mount(
            <REG user = {{
                        "_id":"5fbce8a01e97fe0024cdebeb",
                        "encounters":[],
                        "username":"thiago",
                        "email":"tluigimm@tutanota.com",
                        "createdAt":"2020-11-24T11:04:00.731Z",
                        "__v":0}}
                name = {"t"}
                cr = {5}
                n = {1}
                data = {sampleData}
            />
        );
        wrapper.find("button").simulate("click");
        let result = wrapper.state().newEnc
        expect(result.monsters[0].challenge_rating).toBe("5");
    })
})
