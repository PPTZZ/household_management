import {TPageProps} from "@/lib/definitions";
import {getSingleHousehold} from "@/lib/services/actions";


const HouseHold = async ({params}: TPageProps) => {
    const resolvedParams = await params
    const householdId = resolvedParams.householdId
    await getSingleHousehold(householdId)
    return (
        <div>HouseHold ID: {householdId}</div>
    )
}

export default HouseHold