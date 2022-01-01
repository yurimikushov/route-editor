import { FC, useState } from 'react'
import Map, { ZoomControl } from 'components/Map'
import TextInput from 'components/TextInput'

const App: FC = () => {
  const [address, setAddress] = useState('')

  return (
    <div className='flex'>
      <div className='p-3'>
        <TextInput
          className='w-72'
          value={address}
          placeholder='Поиск мест и адресов'
          hasClear
          onChange={setAddress}
        />
      </div>
      <Map className='relative w-full h-screen bg-gray-50'>
        <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
      </Map>
    </div>
  )
}

export default App
