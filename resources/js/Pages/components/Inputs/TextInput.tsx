export default function TextInput({...props}) {
    return (

        <div className={`input-group mb-3 w-50 me-3 ${props.className}`}>
            <input
                type="text"
                id={props.id ?? props.name}
                className={`form-control ${props.className ?? ""}`}
                {...props}
            />
        </div>)
}
