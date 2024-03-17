import { Attribute, AttributeValue } from "@/types"
import Accordion from "react-bootstrap/Accordion"
import Form from "react-bootstrap/Form"

export interface Props {
  attributes: Attribute[]
  filters: Set<number>
  setFilters: (arg0: Set<number>) => void
}
export default function ({
  attributes,
  filters,
  setFilters,
}: Props): JSX.Element {
  const handleFilter = (
    attribute: Attribute,
    attributeValue: AttributeValue,
    checked: boolean,
  ) => {
    let tmp = new Set(filters)
    if (checked) {
      tmp.add(attributeValue.id)
    } else {
      tmp.delete(attributeValue.id)
    }
    setFilters(new Set(tmp))
  }
  return (
    <Accordion>
      {attributes.map((attribute, attributeIdx) => {
        return (
          <Accordion.Item key={attributeIdx} eventKey={attributeIdx.toString()}>
            <Accordion.Header>{attribute.name}</Accordion.Header>
            <Accordion.Body>
              {attribute.attribute_values.map(
                (attributeValue, attributeValueIdx) => {
                  return (
                    <div key={attributeValueIdx} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label={attributeValue.value}
                        checked={filters.has(attributeValue.id)}
                        onChange={e => {
                          handleFilter(
                            attribute,
                            attributeValue,
                            e.target.checked,
                          )
                        }}
                      />
                    </div>
                  )
                },
              )}
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
