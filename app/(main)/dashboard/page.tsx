import React from 'react'
import Sidebar from "@/lib/ui/sidebar";
import {THousehold} from "@/lib/definitions";
import {getHouseholds} from "@/lib/services/actions";
import CreateHouseholdForm from "@/lib/ui/create-household-form";
import HouseHold from "@/lib/ui/houseHold";
import Link from "next/link";

const Dashboard = async () => {
    const households: THousehold[] = await getHouseholds()
    return (
        <div className={'flex'}>
            <Sidebar/>
            <div>
                {households.map((household: THousehold, i) => {
                    const householdId = household._id.toString()
                    return (
                        <Link key={i} href={`/dashboard/${householdId}`}>
                            <HouseHold owner={household.owner} members={household.members}
                                       title={household.name}/>
                        </Link>
                    )
                })}
                <CreateHouseholdForm/>
            </div>
        </div>
    )
}
export default Dashboard
////////////////////////////////////// TO DO FIX DELETING HOUSEHOLDS BUTTON /////////////////////////////////////