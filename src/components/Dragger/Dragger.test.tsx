import renderer from 'react-test-renderer'
import Dragger from './Dragger'

it('should render dragger control', () => {
  const tree = renderer.create(<Dragger className='w-6 h-6' />).toJSON()
  expect(tree).toMatchSnapshot()
})
