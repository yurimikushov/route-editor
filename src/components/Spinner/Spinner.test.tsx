import renderer from 'react-test-renderer'
import Spinner from './Spinner'

it('should render spinner', () => {
  const tree = renderer.create(<Spinner />).toJSON()
  expect(tree).toMatchSnapshot()
})
