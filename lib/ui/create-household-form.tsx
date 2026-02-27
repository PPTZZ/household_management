'use client'
import React, {useActionState} from 'react'
import {createHouseHold} from "@/lib/services/actions";
import Button from "@/lib/ui/button";

const CreateHouseholdForm = () => {
    const [state, action, pending] = useActionState(createHouseHold, undefined);
    return (
        <form className={'border size-64 bg-white flex flex-col'} action={action}>
            <div>
                <input type="text" placeholder={'name'} name={'household_name'} id={'household_name'}/>
                {state?.errors?.name && <p>{state?.errors?.name}</p>}
            </div>
            <Button>Create</Button>
        </form>
    )
}
export default CreateHouseholdForm
