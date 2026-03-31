import {TPageProps} from "@/lib/definitions";
import {getSingleHousehold} from "@/lib/services/actions";
import Button from "@/lib/ui/button";


const HouseHold = async ({params}: TPageProps) => {
    const resolvedParams = await params;
    const householdId = resolvedParams.householdId;
    const {members,expenses,owner,background,name} = await getSingleHousehold(householdId);
    console.log(name)

    return (
        <div>
            <p>HouseHold ID: {householdId}</p>
            <p>Title: {name}</p>
            <p>Members: {members.map(member => member.first_name).join(', ')}</p>
            <Button>+</Button>
        </div>

    );
}

export default HouseHold;