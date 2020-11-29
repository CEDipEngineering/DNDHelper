import React from "react";
import Enzyme from "enzyme";
import Login from "../main";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import REG from './REG';
import axios from 'axios'
import sampleData from "./sampleData";

configure({ adapter: new Adapter() });

function handleRefresh() {
    console.log("nice")
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
                data = {sampleData}
                handleRefresh = {handleRefresh}
            
            />
        );
        wrapper.find("button").simulate("click");
        let result = wrapper.state().newEnc
        expect(result.monsters).toBe(undefined)
    })

    it("should recieve non empty list", () => {
        const wrapper = mount(
            <REG user = {{
                        "_id":"5fbce8a01e97fe0024cdebeb",
                        "encounters":[],
                        "username":"thiago",
                        "email":"tluigimm@tutanota.com",
                        "createdAt":"2020-11-24T11:04:00.731Z",
                        "__v":0}}
                data = {sampleData}
                name = {"t"}
                cr = {"5"}
                n = {1}
                handleRefresh = {handleRefresh}
            />
        );
        wrapper.find("button").simulate("click");
        let result = wrapper.state().newEnc
        expect(result.monsters.length).not.toBe(0);
    })
})
