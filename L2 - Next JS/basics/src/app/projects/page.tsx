import Container from "@/components/ui/container";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "Project 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, est. Aut repellendus expedita et perspiciatis unde molestias voluptatibus tenetur non facere accusamus perferendis excepturi obcaecati assumenda voluptates, odit repellat provident.",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        title: "Project 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, est. Aut repellendus expedita et perspiciatis unde molestias voluptatibus tenetur non facere accusamus perferendis excepturi obcaecati assumenda voluptates, odit repellat provident.",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        title: "Project 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, est. Aut repellendus expedita et perspiciatis unde molestias voluptatibus tenetur non facere accusamus perferendis excepturi obcaecati assumenda voluptates, odit repellat provident.",
        image: "https://via.placeholder.com/150",
    },
]

export default function Projects() {
  return (
    <Container classname="flex flex-col gap-10">
          <div className="uppercase text-2xl font-medium">Projects</div>

          <div className="space-y-1 rounded-md grid grid-cols-3 gap-4 justify-center items-center">
          {projects.map((project) => {
              return <Link href={`/projects/${project.id}`} key={project.id} className="border p-4 rounded-md space-y-3 h-full">
                  <h1 className="text-lg">{project.title}</h1>
                  <p className="text-xs">{ project.description}</p>
                  </Link>
              })}
          </div>
    </Container>
  );
}

