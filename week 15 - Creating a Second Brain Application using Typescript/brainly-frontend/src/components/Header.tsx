import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./ui/Button"

export const Header = ({ open }) => {
    return (
        <>
            {/* All Notes */}
            <div className="flex items-center justify-between">

                <div><h2 className='text-3xl font-semibold'>All Notes</h2></div>

                <div className='flex gap-2'>

                    <Button
                        variant="primary"
                        title="Share Brain"
                        size="md"
                        startIcon={<ShareIcon size='md' />}
                        onClick={() => alert("Functionality not yet added!")}
                    />

                    <Button
                        variant="secondary"
                        title="Add Content"
                        size="md"
                        startIcon={<PlusIcon size='md' />}
                        onClick={open}
                    />
                </div>

            </div>
        </>
    )
}