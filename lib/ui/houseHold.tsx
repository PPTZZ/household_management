import React from 'react'
import {THouseholdCardProps} from "@/lib/definitions";


const HouseHold = ({owner, members, title}: THouseholdCardProps) => {
    return (
        <div>
            <p> title: {title}</p>
            <p> owner: {owner}</p>
            <p> members: {members.join(' ')}</p>
        </div>
    )
}
export default HouseHold
