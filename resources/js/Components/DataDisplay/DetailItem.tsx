import { isDefined } from "@/utils/misc"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"

export interface Props {
  label: string
  value?: any
  collapsable?: boolean
  maxLength?: number
}
export default function DetailItem({
  label,
  value,
  collapsable = false,
  maxLength = 50,
}: Props): JSX.Element {
  if (!isDefined(value)) {
    return (
      <div className="mb-2">
        <b>{label}</b>
        <div>-</div>
      </div>
    )
  }
  const [renderValue, setRenderValue] = useState(value)
  const [collapsed, setCollapsed] = useState(collapsable)
  useEffect(() => {
    if (collapsed) {
      setRenderValue(value.toString().substring(0, maxLength))
    } else {
      setRenderValue(value)
    }
  }, [collapsed])
  return (
    <div className="mb-2">
      <b>{label}</b>
      <div>
        {renderValue} {collapsed ? "..." : ""}
        {collapsable && (
          <>
            {collapsed ? (
              <Button
                variant="link"
                onClick={() => {
                  setCollapsed(false)
                }}
              >
                More
              </Button>
            ) : (
              <Button
                variant="link"
                onClick={() => {
                  setCollapsed(true)
                }}
              >
                Less
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
