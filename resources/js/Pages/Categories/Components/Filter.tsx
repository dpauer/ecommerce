import { Attribute } from "@/types"
import { useEffect, useState } from "react"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export interface Props {
  attribute: Attribute
  filters: number[]
  setFilters: (arg0: number[]) => void
}
export default function Filter({
  attribute,
  filters,
  setFilters,
}: Props): JSX.Element {
  const defaultSize = 5
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState(true)
  const [attributeValues, setAttributeValues] = useState(
    attribute.attribute_values.slice(0, defaultSize),
  )
  useEffect(() => {
    let tmp = [...attribute.attribute_values]
    if (search.length > 0) {
      tmp = tmp.filter(el =>
        el.value.toLowerCase().includes(search.toLowerCase()),
      )
    }
    if (collapsed) {
      tmp = tmp.slice(0, defaultSize)
    }
    setAttributeValues([...tmp])
  }, [search, collapsed])
  return (
    <>
      <Accordion.Item eventKey={attribute.id.toString()}>
        <Accordion.Header>{attribute.name}</Accordion.Header>
        <Accordion.Body>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-2"
            onChange={e => {
              setSearch(e.target.value)
            }}
          />
          {attributeValues.map((attributeValue, idx) => {
            return (
              <div key={idx}>
                <Form.Check
                  type="checkbox"
                  label={attributeValue.value}
                  checked={filters.includes(attributeValue.id)}
                  onChange={e => {
                    let tmp = new Set(filters)
                    if (e.target.checked) {
                      tmp.add(attributeValue.id)
                    } else {
                      tmp.delete(attributeValue.id)
                    }
                    setFilters(Array.from(tmp))
                  }}
                />
              </div>
            )
          })}
          {collapsed ? (
            <Button
              variant="link"
              onClick={() => {
                setCollapsed(false)
              }}
            >
              Show more
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() => {
                setCollapsed(true)
              }}
            >
              Show less
            </Button>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}
