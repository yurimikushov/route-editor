import { FC } from 'react'
import cn from 'classnames'
import SearchForm from './SearchForm'
import Route from './Route'
import Map from './Map'
import HomeProps from './Home.props'

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={cn(className, 'relative')}>
      <Map className='w-100% h-[60vh] md:h-screen' />
      <div
        className={cn(
          'p-4 min-h-[40vh]',
          'md:fixed md:top-0 md:left-0',
          'md:m-3 md:w-80 md:max-h-full',
          'bg-white rounded-t-xl md:rounded-xl shadow-lg',
          'border border-b-gray-50 border-opacity-50'
        )}
      >
        <SearchForm />
        <Route className='mt-2 max-h-[30vh] md:max-h-[60vh]' />
      </div>
    </div>
  )
}

export default Home
