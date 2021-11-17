
import type { NextPage } from 'next'
import MultistepForm from "../components/MultiStepForm/MultistepForm"

const SignUpPage: NextPage = () => {
  return (
  <>
  <div className='h-[100vh] flex flex-col  items-center justify-center'>
        <div className='p-10 border rounded-sm text-center'>
          <MultistepForm />
        </div>
      </div>
  </>
  )
}

export default SignUpPage