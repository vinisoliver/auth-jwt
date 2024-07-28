import { BackgroundBox } from "../../components/background-box";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/form/input";
import { FieldWithErrorMessage } from "../../components/form/field-with-error-message";
import { RegisterSchema, RegisterSchemaType } from "./schemas";
import { cpfMask } from "../../utils/masks";

export function RegisterPage() {
  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit'
  })

  function submit(data: RegisterSchemaType) {
    console.log(data, "asdfsa")
  }

  return (
    <div className="bg-yellow-50 h-full w-full flex justify-center">
      <BackgroundBox 
        content={(
          <div className="flex flex-col gap-4">
            <h1 className="text-bold text-3xl">Register</h1>
            
            <FormProvider {...registerForm}>
              <form 
                onSubmit={registerForm.handleSubmit(submit)}
                className="w-full flex flex-col gap-4"
              >
                <FieldWithErrorMessage<RegisterSchemaType> field="username">
                  <Input 
                    label="Username"
                    placeholder="johndoe"
                    id="username"
                    type="text"
                    {...registerForm.register("username")}
                  />
                </FieldWithErrorMessage>

                <div className="flex gap-4 w-full">
                  <FieldWithErrorMessage<RegisterSchemaType> field="firstName">
                    <Input 
                      label="First Name"
                      placeholder="John"
                      id="first-name"
                      type="text"
                      {...registerForm.register("firstName")} 
                    />
                  </FieldWithErrorMessage>

                  <FieldWithErrorMessage<RegisterSchemaType> field="lastName">
                    <Input 
                      label="Last Name"
                      placeholder="Doe"
                      id="last-name"
                      type="text"
                      {...registerForm.register("lastName")} 
                    />
                  </FieldWithErrorMessage>
                </div>
                <FieldWithErrorMessage<RegisterSchemaType> field="email">
                  <Input 
                    label="Email"
                    placeholder="johndoe@enterprise.br"
                    id="email"
                    type="email"
                    {...registerForm.register("email")} 
                  />
                </FieldWithErrorMessage>

                <FieldWithErrorMessage<RegisterSchemaType> field="phoneNumber">
                  <Input 
                    label="Phone Number"
                    placeholder="(XX) XXXX XXXXX"
                    id="phone-number"
                    type="text"
                    {...registerForm.register("phoneNumber")} 
                  />
                </FieldWithErrorMessage>

                <div className="flex gap-4 w-full">
                  <FieldWithErrorMessage<RegisterSchemaType> field="cep">
                    <Input 
                      label="CEP"
                      placeholder="12345-678"
                      id="cep"
                      type="text"
                      {...registerForm.register("cep")} 
                    />
                  </FieldWithErrorMessage>

                  <FieldWithErrorMessage<RegisterSchemaType> field="cpf">
                    <Input 
                      label="CPF"
                      placeholder="XXX XXX XXX XX"
                      id="cpf"
                      type="text"
                      mask={cpfMask}
                      {...registerForm.register("cpf")} 
                    />
                  </FieldWithErrorMessage>
                </div>

                <FieldWithErrorMessage<RegisterSchemaType> field="dateOfBirth">
                  <Input 
                    label="Date of Birth"
                    placeholder="DD / MM / YYYY"
                    id="date-of-birth"
                    type="date"
                    {...registerForm.register("dateOfBirth")} 
                  />
                </FieldWithErrorMessage>

                <FieldWithErrorMessage<RegisterSchemaType> field="password">
                  <Input 
                    label="Password"
                    placeholder="Write a password"
                    id="password"
                    type="password"
                    {...registerForm.register("password")} 
                  />
                </FieldWithErrorMessage>

                <FieldWithErrorMessage<RegisterSchemaType> field="confirmPassword">
                  <Input 
                    label="Confirm Password"
                    placeholder="Confirm the password"
                    id="confirm-password"
                    type="password"
                    {...registerForm.register("confirmPassword")} 
                  />
                </FieldWithErrorMessage>

                <button 
                  type="submit"
                  className="p-3 mt-2 bg-yellow-200 rounded-md"
                >
                  Registrar
                </button>
              </form>
            </FormProvider>
          </div>
        )}
        banner={(
          <div className="flex items-center mt-24 h-full flex-col">
            <h2 className="text-gray-100 font-bold text-2xl">Welcome to</h2>
            <h2 className="text-white font-bold text-5xl tracking-widest">ENTERPRISE</h2>
          </div>
        )}
      />
    </div>
  )
}