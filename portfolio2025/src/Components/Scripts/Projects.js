import { useEffect, useState } from 'react'
import Skeleton from './Skeleton_cards'
import Cards from './Card'

const Projects = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])

    return (
        <>
        <div className='flex justify-center items-center h-screen bg-dark-grey'>
            {loading ? <Skeleton /> : <Cards />}
        </div>
        </>
    )
}

export default Projects