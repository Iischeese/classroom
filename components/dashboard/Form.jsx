import Input from "../Input"
import Label from "../Label"

function Form({ children, className, min }) {
    return (
        <form className={className + ` ${min? "w-min" : "w-full"} flex flex-col gap-4`}>
            {children}
        </form>
    )
}

function FormInput({ label, placeholder, id, type }) {
    return (
        <FormSpace>
            <Label id={id}>{label}:</Label>
            <Input type={type} name={id} id={id} placeholder={placeholder} />
        </FormSpace>
    )
}

function FormSpace({ children }) {
    return (
        <div className="flex w-full flex-col gap-2">
            {children}
        </div>
    )
}

function TextArea({ id, label }) {
    return (
        <FormSpace>
            <Label id={id}>{label}</Label>
            <textarea className="bg-secondary rounded-md border border-text/40 w-full px-5 py-3 focus:outline-none" name={id} id={id} />
        </FormSpace>
    )
}

function ErrorSpace({ errorText }) {
    return (
        <div className='w-full text-red/90 bg-red/40 border border-red rounded-md p-5 py-3'>
            {errorText}
        </div>
    )
}

export { FormInput, TextArea, FormSpace, ErrorSpace }

export default Form