import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds')
        const data = await res.json()
        setDogs(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDogData()
  }, [])
  return (
    <>
      {!dogs ? (
        <h1 className='flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase'>
          Loading...
        </h1>
      ) : (
        <>
          <section className='p-8 max-w-7xl mx-auto '>
            <div className='text-center'>
              <h1 className='flex items-center justify-center text-center px-5 text-3xl lg:text-5xl font-bold text-white'>
                The Dog App
              </h1>
              <p className='my-8 text-white'>
                This application is powered by the{' '}
                <a
                  href='https:thedogapi.com'
                  className='text-indigo-600 underline active:text-orange-400'
                >
                  The dog Api
                </a>
              </p>
              <form className='max-w-xl mx-auto' autoComplete='off'>
                <input
                  type='text'
                  name='searh'
                  id='search'
                  placeholder='search for a dog or breed'
                  className=' py-2 px-4 rounded shadow w-full bg-slate-400 text-white placeholder-white'
                />
              </form>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20 '>
              {dogs.map((dog) => (
                <Link
                  to={`/${dog.name}`}
                  key={dog.id}
                  className='bg-slate-700 p-4 rounded hover:bg-slate-600 transition-all duration-200'
                >
                  <article>
                    <img
                      className='rounded md:h-72 w-full object-cover'
                      src={dog.image.url}
                      alt={dog.name}
                      loading='lazy'
                    />
                    <h3 className='text-white text-lg font-bold mt-4'>
                      {dog.name}
                    </h3>
                    <p className='text-slate-400'>Bred For : {dog.bred_for}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Home
