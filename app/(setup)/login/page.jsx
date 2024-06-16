import SplitView from '@/components/Splitview'
import { Title } from '@/components/Typography'
import { login, signup } from './actions'
import FormButton from '@/components/dashboard/FormButton'
import { ErrorSpace, FormInput, FormSpace } from '@/components/dashboard/Form'

export default function LoginPage({ searchParams }) {

  return (
    <SplitView>
      <Title>Login</Title>
      <form className='flex flex-col items-start justify-center w-full gap-8'>
        <FormInput label={"Email"} id={"email"} />
        <FormInput type="password" label={"Password"} id={"password"} />
        <FormSpace>
          <FormButton primary formAction={login} pendingText={"Logging In"}>Login</FormButton>
          <FormButton formAction={signup} pendingText="Signing Up">Sign Up</FormButton>
        </FormSpace>
        {
          searchParams.error ?
            <ErrorSpace errorText={searchParams.error} />
            :
            <></>
        }
      </form>
    </SplitView>
  )
}