export interface Props {
    label: string;
    value: any;
}
export default function DetailItem({ label, value }: Props): JSX.Element {
    return (
        <>
            <b>{label}</b>
            <span className="ml-3">{value}</span>
        </>
    );
}
