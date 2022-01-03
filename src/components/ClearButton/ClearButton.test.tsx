import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import ClearButton from './ClearButton'

it('should render clear button', () => {
  const tree = renderer.create(<ClearButton onClick={noop} />).toJSON()
  expect(tree).toMatchSnapshot()
})
