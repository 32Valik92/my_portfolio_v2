import { ReactNode } from "react";

type SectionProps = {
    id?: string;
    children: ReactNode;
    className?: string;
}

const Section = ({ id, children, className }: SectionProps)=> {
  return (
    <section
      id={id}
      className={`w-full flex justify-center px-[16px] ${className}`}
    >
      <div className="w-full max-w-[1250px]">
        {children}
      </div>
    </section>
  );
};

export default Section;