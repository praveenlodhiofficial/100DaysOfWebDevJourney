import React from "react";

interface containerProps {
  children: React.ReactNode,
  classname?: String
}

export default function Container({ children, classname, }: containerProps) {
  return <div className={`max-w-5xl border mx-auto p-10 ${classname}`}>{children}</div>;
}