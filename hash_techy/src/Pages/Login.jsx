import { Box, Button, Flex, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../redux/auth/actions'
import { AUTH_RESET_MESSAGE } from '../redux/auth/ActionTypes'

function Login() {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()
    const state = useSelector(state => state.auth)
    console.log('state: ', state);
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        if (state.message) {
            toast({
                title: state.message,
                status: state.error ? 'error' : 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            if(!state.error){
               dispatch({type: AUTH_RESET_MESSAGE})
               setTimeout(() => {
                       navigate('/products')
                }, 2000);
                
            }
        }
    }, [state.message, state.error,state.role, dispatch, toast, navigate])

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formdata)
        dispatch(signin(formdata))
        setformdata({
            email: '',
            password: ''
        })
    }

  return (
   <Box
   w={{ base: '80%', md: '70%', lg: '60%' }}
    m="auto"
    mt="10"
    p="5"
    shadow={'xl'}
    rounded={'md'}
   >
    <Heading
    textAlign={'center'}>LogIn</Heading>

    <FormLabel mt='4'>Email</FormLabel>
    <Input type='text' placeholder='Enter your email'  name='email' value={formdata.email} onChange={handleChange} />
    <FormLabel mt='4'>Password</FormLabel>
    <Input type='password' placeholder='Enter your password'  name='password' value={formdata.password} onChange={handleChange} />
    <Button mt='4'
    loadingText='Submitting...'
    isLoading={state.loading}
    variant={'outline'} border='2px solid black'  _hover={{bg:'black',color:'white'}} w='100%' onClick={handleSubmit}>Login</Button>
    <Flex mt='4' justifyContent='center' color={'grey'}>
        <p>Don't have an account?</p>
        <Link to='/signup'>
        <Text color='blue' cursor={'pointer'} fontWeight={'bold'} ml='2'>Signup</Text>
        </Link>
    </Flex>
    <Text fontWeight={900} mt={4}>Some time signup/login takes around 3 to 4 minutes.
        And Some times it would be faild due to api error that deployed on render so for avoid that 
         use
          Email id = eve.holt@reqres.in and
        Password = cityslicka

        For Any query read github reademe file.
    </Text>
        </Box>
  )
}

export default Login