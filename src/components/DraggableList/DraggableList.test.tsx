import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import DraggableList from './DraggableList'

it(`should render draggable points when route contains more than 1 element`, () => {
  const list = [
    {
      id: '1',
      title: 'Item #1',
    },
    {
      id: '2',
      title: 'Item #2',
    },
  ]

  const tree = renderer
    .create(
      <DraggableList
        className='some-draggable-list'
        draggableClassName='dragging-modifier'
        list={list}
        renderItem={(item, isDragging) => (
          <div>
            <div>{item.title}</div>
            {isDragging && <div>Dragger</div>}
          </div>
        )}
        onUpdate={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`should render non-draggable point when route contains 1 element`, () => {
  const list = [
    {
      id: '1',
      title: 'Item #1',
    },
  ]

  const tree = renderer
    .create(
      <DraggableList
        className='some-draggable-list'
        draggableClassName='dragging-modifier'
        list={list}
        renderItem={(item, isDragging) => (
          <div>
            <div>{item.title}</div>
            {isDragging && <div>Dragger</div>}
          </div>
        )}
        onUpdate={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`should render empty container when list is empty`, () => {
  const list = [] as Array<{ id: string; title: string }>

  const tree = renderer
    .create(
      <DraggableList
        className='some-draggable-list'
        draggableClassName='dragging-modifier'
        list={list}
        renderItem={(item, isDragging) => (
          <div>
            <div>{item.title}</div>
            {isDragging && <div>Dragger</div>}
          </div>
        )}
        onUpdate={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
