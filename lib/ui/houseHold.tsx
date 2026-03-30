import React from 'react'
import Button from "@/lib/ui/button";
import {THouseholdCardProps} from "@/lib/definitions";


const HouseHold = ({owner, members, title}: THouseholdCardProps) => {
    return (
        <div>
            <p> title: {title}</p>
            <p> owner: {owner}</p>
            <p> members: {members}</p>
            <Button>X</Button>
        </div>
    )
}
export default HouseHold
