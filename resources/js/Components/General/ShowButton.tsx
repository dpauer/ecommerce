import { Link } from "@inertiajs/react"

export interface Props {
  url: string
}
export default function ShowButton({ url }: Props): JSX.Element {
  return (
    <Link href={url} className="btn btn-secondary btn-sm">
      Details
    </Link>
  )
}
