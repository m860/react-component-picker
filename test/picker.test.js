/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import {mount} from "enzyme";
import HistoryTextInputPicker from '../src/components/HistoryTextInputPicker'

const wrapper = mount((
	<HistoryTextInputPicker name="abc"/>
));

test(`HistoryTextInputPicker.name='abc'`, () => {
	expect(wrapper.props().name).toBe('abc')
});

test(`allow to set props`, () => {
	wrapper.setProps({name: "def"});
	expect(wrapper.props().name).toBe('def');
})

test(`show picker when input is focused`, () => {
	wrapper.find('input').simulate('focus');
	const picker = wrapper.find('.react-component-picker-data');
	expect(picker.props().style.display).toBe('');
})


