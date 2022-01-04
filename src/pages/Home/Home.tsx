import { FC } from 'react'
import cn from 'classnames'
import SearchForm from './SearchForm'
import Route from './Route'
import Map from './Map'
import HomeProps from './Home.props'

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={cn(className, 'relative')}>
      <Map className='w-100% h-screen' />
      <div
        className={cn(
          'fixed top-0 left-0',
          'm-3 p-4 w-80 max-h-full',
          'bg-white rounded-xl shadow-lg',
          'border border-b-gray-50 border-opacity-50'
        )}
      >
        <SearchForm />
        <Route className='mt-2 max-h-[60vh]' />
      </div>
    </div>
  )
}

export default Home
