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

test(`show/hide picker when input is focused/blurred`, () => {
	const input = wrapper.find('input');
	const picker = wrapper.find('.react-component-picker-data');
	input.simulate('focus');
	expect(picker.props().style.display).toBe('');
	input.simulate('blur');
	expect(picker.props().style.display).toBe('none');
});

test(`can save history when blur`, async () => {
	const input = wrapper.find('input');
	const key = wrapper.props().name;
	input.node.value = 'a';
	input.simulate('blur');
	input.node.value = 'b';
	input.simulate('blur');
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				const values = JSON.parse(window.localStorage.getItem(key));
				let index = -1;
				if (values) {
					index = values.indexOf('a');
				}
				expect(index >= 0);
			}
			catch (ex) {
				console.error(ex);
			}
			finally {
				resolve();
			}
		}, 1);
	})
})

test(`can restore history value`, async () => {
	const input = wrapper.find('input');
	input.node.value = 'a';
	input.simulate('blur');
	input.node.value = 'b';
	input.simulate('blur');
	return new Promise((resolve) => {
		setTimeout(() => {
			const firstLink = wrapper.find('a').first();
			firstLink.simulate('click');
			const value = wrapper.find('input').node.value;
			expect(value).toBe(firstLink.text())
			resolve();
		}, 1);
	});

})


