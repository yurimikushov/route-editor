import { FC } from 'react'
import Map, { ZoomControl } from 'components/Map'

const App: FC = () => {
  return (
    <Map className='relative w-full h-screen'>
      <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
    </Map>
  )
}

export default App
