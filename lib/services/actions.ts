'use server'
import {FormState, SignupSchema} from '@/lib/definitions'

//////////////////////////
/// Register
//////////////////////////
export const signup = async (state: FormState, formData: FormData) => {
    const validateForm = SignupSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validateForm.success) {
        return {
            errors: validateForm.error.flatten().fieldErrors,
        }
    }
    console.log(formData)
}
//////////////////////////
/// Login
//////////////////////////