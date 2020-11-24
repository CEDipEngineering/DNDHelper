import React from "react";
import { shallow } from "enzyme";
import Dice from "./Dice";
import Enzyme from "enzyme";
import { Snackbar, IconButton } from "./Dice";
import Login from "../main";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from "../App";
import Main from '../main'

configure({ adapter: new Adapter() });


describe('Dice', () => {
it("component renders correctly", () => {
  const wrapper = shallow(
    <Dice />
  );
  expect(wrapper).toMatchSnapshot();
});


it("random function works correctly", () => {
  
  const wrapper = shallow(
      <Dice {...{"number": 20}}/>
    );

  const value = wrapper.instance().roll()
  expect(value).toBeGreaterThanOrEqual(1);
  console.log(wrapper.props("number"))
  expect(value).toBeLessThan(wrapper.instance().props.number+1);
  // // expect(wrapper.state("setOpen")).toBe(true);
  });
  

 });
