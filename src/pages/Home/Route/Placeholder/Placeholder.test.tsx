import renderer from 'react-test-renderer'
import Placeholder from './Placeholder'

it('should render placeholder', () => {
  const tree = renderer
    .create(<Placeholder className='empty-placeholder' />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
