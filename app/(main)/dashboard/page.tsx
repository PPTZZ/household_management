import React from 'react'
import Sidebar from "@/lib/ui/sidebar";
import {THousehold} from "@/lib/definitions";
import {deleteHousehold, getHouseholds} from "@/lib/services/actions";
import CreateHouseholdForm from "@/lib/ui/create-household-form";
import Button from "@/lib/ui/button";

const Dashboard = async () => {
    const households: THousehold[] = await getHouseholds()
    return (
        <div className={'flex'}>
            <Sidebar/>
            <div>
                {households.map((household: THousehold, i) => {
                    return (
                        <div key={i}>
                            <p>{household.name}</p>
                            <p>{household.members}</p>
                            <Button action={deleteHousehold}>X</Button>
                        </div>
                    )
                })}
                <CreateHouseholdForm/>
            </div>
        </div>
    )
}
export default Dashboard
////////////////////////////////////// TO DO FIX DELETING HOUSEHOLDS BUTTON /////////////////////////////////////