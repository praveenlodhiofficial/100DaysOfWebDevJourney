import { Circle, Pencil, Eraser } from "lucide-react"
import { Tool } from "./Canvas"
import { IconButton } from "./IconButton"
import BoxIcon from "./ui/BoxIcon"
import LineIcon from "./ui/LineIcon"

export function TopBar({
    selectedTool,
    setSelectedTool
}: {
    selectedTool: Tool,
    setSelectedTool: (tool: Tool) => void
}) {
    return (
        <div className="fixed flex-col border gap-5 text-white  border-white rounded-md top-5 right-5 flex justify-between items-center px-3 py-2">

            <IconButton
                icon={<Pencil />}
                onClick={() => setSelectedTool("pencil")}
                activated={selectedTool === "pencil"}
            />

            <IconButton
                icon={<Circle />}
                onClick={() => setSelectedTool("circle")}
                activated={selectedTool === "circle"}
            />

            <IconButton
                icon={<BoxIcon />}
                onClick={() => setSelectedTool("box")}
                activated={selectedTool === "box"}
            />

            <IconButton
                icon={<LineIcon />}
                onClick={() => setSelectedTool("line")}
                activated={selectedTool === "line"}
            />

            <IconButton
                icon={<Eraser />}
                onClick={() => setSelectedTool("eraser")}
                activated={selectedTool === "eraser"}
            />

        </div>
    )
}
