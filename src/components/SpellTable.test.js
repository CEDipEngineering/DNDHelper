import React from "react";
import { shallow } from "enzyme";
import SpellTabel from "./SpellTable";
import { Input, Button } from "./SpellTable";
import Enzyme from "enzyme";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from"enzyme-to-json";

describe('SpellTabel', () => {
    it ("Randering pageSpells with no Spells or Filter", () => {
        const props = {
            spellInfo: [],
            allCallbacks:{filter:[]}
        }

        const wrapper = shallow(
            <SpellTabel {...props}/>
          );
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it ("Randering pageSpells with one spell and no Filter", () => {
        const props = { 
            spellInfo: {archetype: "Druid: Swamp",
            casting_time: "1 action",
            circles: "Swamp",
            components: "V, S, M",
            concentration: "no",
            desc: "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
            dnd_class: "Druid, Wizard",
            document__license_url: "http://open5e.com/legal",
            document__slug: "wotc-srd",
            document__title: "Systems Reference Document",
            duration: "Instantaneous",
            higher_level: "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
            level: "2nd-level",
            level_int: 2,
            material: "Powdered rhubarb leaf and an adder's stomach.",
            name: "Acid Arrow",
            page: "phb 259",
            range: "90 feet",
            ritual: "no",
            school: "Evocation",
            slug: "acid-arrow"},

            allCallbacks:{filter:[]}}  

        const wrapper = shallow(
            <SpellTabel {...props}/>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    if ("Randering page when clicking next button", () =>{

        const props = {
            spellInfo: {slug: "acid-arrow"},
            allCallbacks:{filter:[],
                          next:true}
        }     

        const wrapper = shallow(
            <SpellTabel {...props}/>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    });



    });