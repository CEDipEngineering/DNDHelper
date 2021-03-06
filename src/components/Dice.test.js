import React from "react";
import Dice from "./Dice";
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Dice', () => {
  it("component renders correctly", () => {
    const wrapper = shallow(
      <Dice />
    );
    expect(wrapper).toMatchSnapshot();
  });


  it("random function works correctly for dice 20", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 20 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }
  });


  it("random function works correctly for dice 12", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 12 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }
  });


  it("random function works correctly for dice 10", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 10 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }

  });

  it("random function works correctly for dice 8", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 8 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }

  });

  it("random function works correctly for dice 6", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 6 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }

  });

  it("random function works correctly for dice 4", () => {

    const wrapper = shallow(
      <Dice {...{ "number": 4 }} />
    );

    let value;
    for (let i = 0; i < 100; i++) {
      value = wrapper.instance().roll()
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThan(wrapper.instance().props.number + 1);
    }

  });

});
