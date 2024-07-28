import { useFormContext } from "react-hook-form"

interface FieldWithErrorMessageProps<T> {
  children: JSX.Element,
  field: string & keyof T,
}

export function FieldWithErrorMessage<T>({ children, field }: FieldWithErrorMessageProps<T>) {
  const { formState: { errors } } = useFormContext()

  const error = errors[field]

  return (
    <div className="flex flex-col gap-2 w-full">
      {children}
      {error && (
        <p className="text-xs text-red-500">
          {error.message as string}
        </p>
      )}
    </div>
  )
}