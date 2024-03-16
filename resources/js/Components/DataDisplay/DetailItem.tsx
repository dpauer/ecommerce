export interface Props {
  label: string
  value: any
}
export default function DetailItem({ label, value }: Props): JSX.Element {
  return (
    <div className="mb-2">
      <b>{label}</b>
      <div>{value}</div>
    </div>
  )
}
