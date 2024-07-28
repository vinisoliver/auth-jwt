import React, { ChangeEvent, useState } from "react"
import { Mask, MaskResponse } from "../../utils/masks"

interface InputTextProps {
  type: 'text' | 'date' | 'password' | 'email'
  id: string,
  label: string,
  placeholder: string,
  mask?: Mask,
}

export const Input = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ type, id, label, placeholder, mask, ...rest }, ref) => {
    const [value, setValue] = useState<MaskResponse | null>()

    function handleFormatMask(event: ChangeEvent<HTMLInputElement>) {
      if(!mask) {
        setValue({
          primitiveValue: '',
          formatedValue: event.target.value,
        })

        return
      }

      const values = mask(event.target.value)

      setValue(values)
    }

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>

        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`
            bg-yellow-50 border-yellow-200 border-2 
            py-2 px-4 rounded-md 
            outline-none outline-offset-0 
            focus-visible:outline-yellow-200
          `}
          ref={ref}
          {...rest}
          onChange={rest.onChange()}
          value={value?.formatedValue}
        />

        {/* {mask && (
          <input 
            type="text"
   
            value={value?.primitiveValue}
            {...rest}
          />
        )} */}
      </div>
    )
})