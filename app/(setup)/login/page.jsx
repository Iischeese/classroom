import SplitView from '@/components/Splitview'
import Button from '@/components/Button'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Title from '@/components/Title'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <SplitView>
      <Title>Login</Title>
      <form className='flex flex-col items-start justify-center w-full gap-8'>
        <div className='w-full flex flex-col gap-2'>
          <Label id="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Label id="password">Password:</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Button click={login}>Log in</Button>
          <Button primary click={signup}>Sign up</Button>
        </div>
      </form>
    </SplitView>
  )
}