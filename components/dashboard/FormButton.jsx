'use client'

import {useFormStatus} from 'react-dom'
import Button from "../Button"
import LoadingThrobber from './LoadingThrobber'

function PendingView({text}){
    return(
        <div className='flex gap-2 items-center justify-center'>{text}... <LoadingThrobber/></div>
    )
}

function FormButton({children, primary, pendingText, formAction, ...props}){

    const {pending, action} = useFormStatus()

    const isPending = pending && action == formAction

    return(
        <Button {...props} disabled={isPending} primary={primary} click={formAction} >{isPending ? <PendingView text={pendingText}/> : children }</Button>
    )
}

export default FormButton