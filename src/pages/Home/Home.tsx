import { FC } from 'react'
import cn from 'classnames'
import Map, { ZoomControl } from 'components/Map'
import SearchForm from './SearchForm'
import Route from './Route'
import HomeProps from './Home.props'

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={cn(className, 'flex')}>
      <div className='m-3 flex flex-col'>
        <SearchForm />
        <Route />
      </div>
      <Map className='relative w-full h-screen bg-gray-50'>
        <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
      </Map>
    </div>
  )
}

export default Home
