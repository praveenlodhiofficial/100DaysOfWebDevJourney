import Container from "@/components/ui/container";

interface UserProps {
    id: number,
    firstName: string
    lastName: string
    age: number
}

interface UserResponse {
    user: UserProps[],
    total: number
}

export default function UseHook() {


    return (
        <Container classname="flex flex-col gap-10">
            <h1 className="text-xl font-medium uppercase">Use Hook</h1>
        </Container>
    )
}
