import { FC } from 'react'
import cn from 'classnames'
import SearchForm from './SearchForm'
import Route from './Route'
import Map from './Map'
import HomeProps from './Home.props'

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={cn(className, 'flex')}>
      <div className='m-3 flex flex-col w-80'>
        <SearchForm />
        <Route />
      </div>
      <Map />
    </div>
  )
}

export default Home
