import {FC, InputHTMLAttributes} from 'react'

type InputElementProps = InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputElementProps> = ({...rest}) => {
  return (
    <input {...rest} />
  )
}

export default Input
