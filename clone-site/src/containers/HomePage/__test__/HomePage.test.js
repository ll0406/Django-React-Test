import React from "react";
import { shallow, mount } from "enzyme";
import HomePage from '../../HomePage';
import ChangeText from '../../../components/ChangeText';

{/*Setup function for shallow render or mount*/}
function setup(renderShallow) {
    const enzymeWrapper = renderShallow
        ? shallow(<HomePage />)
        : mount(<HomePage />);

    return {
        enzymeWrapper
    };
}

describe('HomePage container', () => {
    it('should have one ChangeText component', () => {
        const { enzymeWrapper } = setup(true);
        expect(enzymeWrapper.find(ChangeText)).toHaveLength(1);
    })

    it('should render ChangeText with correct texts as props', () => {
        const { enzymeWrapper } = setup(true);
        enzymeWrapper.setState({
            this_text: "Game",
            that_text: "is awesome"
        })
        expect(enzymeWrapper.find(ChangeText).prop('thisText')).toEqual('Game');
        expect(enzymeWrapper.find(ChangeText).prop('thatText')).toEqual('is awesome');
    })

});
