import { PropsWithChildren } from "react";

export default function HSpace({ children }: PropsWithChildren): JSX.Element {
    return <div className="hstack gap-1">{children}</div>;
}
