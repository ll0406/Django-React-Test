import React from "react";
import { shallow, mount } from "enzyme";
import ChangeText from '../../ChangeText';

{/*Setup function for shallow render or mount*/}
function setup(renderShallow, this_text, that_text, onRefresh) {
    const props = {
        this_text,
        that_text,
        onRefresh
    };

    const enzymeWrapper = renderShallow
        ? shallow(<ChangeText {...props} />)
        : mount(<ChangeText {...props} />);

    return {
        props,
        enzymeWrapper
    };

}

{/* Shallow render <ChangeText> component and store at enzymeWrapper */}
const onRefresh = jest.fn();
const { enzymeWrapper, props } = setup(
    true,
    'Hellow',
    'World',
    onRefresh
)


describe('ChangeText Component', () => {
    it('should have two div with className link', () => {
        expect(enzymeWrapper.find('.link')).toHaveLength(2)
    })

    it('should call onRefresh when link is clicked', () => {
        enzymeWrapper.find('.link').at(0).simulate('click');
        expect(onRefresh).toBeCalled();
    })

})