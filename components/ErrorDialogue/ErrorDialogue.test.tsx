import React from 'react';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorDialogue from './ErrorDialogue';

const testText = 'This is the test error message.';

describe('Error Dialogue', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const view = render(<ErrorDialogue displayText={testText} />);

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Input Text', () => {
    it('Should render the passed input text', () => {
      /* Arrange */
      /* Act */
      const view = mount(<ErrorDialogue displayText={testText} />);

      /* Assert */
      expect(view.find('h6').text()).toEqual(testText);
    });
  });
});
