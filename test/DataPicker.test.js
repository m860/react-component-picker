/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import {mount} from "enzyme";
import DataPicker from '../src/components/DataPicker'

describe(`test <DataPicker/>`, () => {
	test(`toggle picker when input is focused or blurred`, () => {
		const ele = mount(
			<DataPicker>
				<a href="javascript:void(0)">Hello World!</a>
			</DataPicker>
		);
		const input = ele.find('input');
		const picker = ele.find('.react-component-picker-data');
		input.simulate('focus');
		expect(picker.props().style.display).toBe('');
		input.simulate('blur');
		expect(picker.props().style.display).toBe('none');
	});
	test(`hide pick only when mouse full leave the picker element`, () => {
		const ele = mount(
			<DataPicker>
				<a href="javascript:void(0)">Hello World!</a>
			</DataPicker>
		);
		const input = ele.find('input');
		const picker = ele.find('.react-component-picker-data');
		input.simulate('focus');
		expect(picker.props().style.display).toBe('');
		ele.simulate('mouseenter');
		input.simulate('blur');
		expect(picker.props().style.display).toBe('');
		ele.simulate('mouseleave');
		expect(picker.props().style.display).toBe('none');
	});

	test(`always show picker when user interaction with the picker`, () => {
		const ele = mount(
			<DataPicker>
				<a href="javascript:void(0)">Hello World!</a>
			</DataPicker>
		);
		const input = ele.find('input');
		const picker = ele.find('.react-component-picker-data');
		const a = ele.find('a');
		input.simulate('focus');
		expect(picker.props().style.display).toBe('');
		ele.simulate('mouseenter');
		input.simulate('blur');
		a.simulate('click');
		expect(picker.props().style.display).toBe('');
	});
})

