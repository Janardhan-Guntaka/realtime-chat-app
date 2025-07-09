import Victory from '@/assets/victory.svg'
import Background from '@/assets/login2.png'
import { Tabs } from '@/components/ui/tabs'
import { Input } from "@/components/ui/input"
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '@/utils/constants'
import { apiClient } from '@/lib/api-client'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'


const Auth = () => {
    const navigate = useNavigate()
    const {setUserInfo} = useAppStore()
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')


    const validateLogin =() =>{
        if(!email.length){
            toast.error('Please provide an email')
            return false
        }
        if(!password.length){
            toast.error('Please provide an password')
            return false
        }
        return true
    }

    const validateSignup = () =>{
        if(!email.length){
            toast.error('Please provide an email')
            return false
        }
        if(!password.length){
            toast.error('Please provide an password')
            return false
        }
        if(password !==confirmPassword){
            toast.error('Password do not match')
            return false
        }
        return true
    }

    const handleLogin = async () => {
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTES, {email,password}, {withCredentials:true})
            if(response.data.user.id){
                setUserInfo(response.data.user)
                if(response.data.user.profileSetup){
                    navigate('/chat')
                }
                else{
                    navigate('/profile')
                }
            }
            console.log(response)
        }
    }

    const handleSignup = async () => {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTES, {email,password}, {withCredentials:true})
                if(response.status === 201){
                setUserInfo(response.data.user)
                navigate('/profile')
            }
            console.log({response})
        }
    }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w[60vw] rounded-3xl grid xl:grid-cols-2">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center">
                        <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                        <img src={Victory} alt="victory" className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <p className="font-medium text-center">Let's get started with Texty</p>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <Tabs className='w-3/4' defaultValue='login'>
                        <TabsList className='flex bg-transparent rounded-none w-full'>
                            <TabsTrigger 
                            value='login' 
                            className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>
                            Login
                            </TabsTrigger>
                            <TabsTrigger value='signup' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>
                                Signup
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent className='flex flex-col gap-5 mt-10' value="login">
                            <Input 
                            placeholder = 'Email'
                            type='email'
                            className='rounded-full p-6'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                            placeholder = 'Password'
                            type = 'password'
                            className = 'rounded-full p-6'
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)} />
                            <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
                        </TabsContent>
                        <TabsContent className='flex flex-col gap-5 ' value="signup">
                        <Input 
                            placeholder = 'Email'
                            type='email'
                            className='rounded-full p-6'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                            placeholder = 'Password'
                            type = 'password'
                            className = 'rounded-full p-6'
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)} />
                            <Input 
                            placeholder = 'Confirm Password'
                            type = 'password'
                            className = 'rounded-full p-6'
                            value = {confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                            <Button className='rounded-full p-6' onClick={handleSignup}>Signup</Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div>
                <img src={Background} alt="background" className='hidden xl:flex h-[700px]' />
            </div>
        </div>
    </div>
  )
}

export default Auth