import Container from "@/components/ui/container";
import Projects from "../page";

export default async function SingleProject(
    { params }: { params: Promise<{ slug: string }>}
) {
    const {slug } = await params

    return (
        <Container classname="flex flex-col gap-10">
            <div>Single Project</div>
        </Container>
    )
}

 