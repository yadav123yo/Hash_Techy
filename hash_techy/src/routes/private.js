

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Private({children}) {
    const state = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
    if(state.isAuth === false){
        navigate('/')
    }
    }, [state.isAuth, navigate])

  return  (
    children
    )
}

export default Private