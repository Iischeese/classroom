import Input from "../Input"
import Label from "../Label"

function Form({children}){
    return(
        <form className="flex flex-col gap-4">
            {children}
        </form>
    )
}

function FormInput({label, placeholder, id, type}){
    return(
        <div className="flex flex-col gap-2">
            <Label id={id}>{label}:</Label>
            <Input type={type} name={id} id={id} placeholder={placeholder}/>
        </div>
    )
}

function TextArea({id}){
    return(
        <textarea className="bg-secondary rounded-md border border-text/40 w-full px-5 py-3 focus:outline-none" name={id} id={id} />
    )
}

export {FormInput, TextArea}

export default Form