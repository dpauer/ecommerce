import axios from "axios"
import { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"

export interface Props {
  label: string
  placeholder: string
  name: string
  data: any
  setData: any
  errors: any
}
export default function InputTypeSelectAttributeType({
  label,
  placeholder,
  name,
  data,
  setData,
  errors,
}: Props): JSX.Element {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    axios
      .get(route("dashboard.api.attribute-types.index"))
      .then(res => res.data)
      .then(data => {
        setOptions(data)
      })
  }, [])
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={data[name]}
        onChange={e => setData(name, e.target.value)}
        isInvalid={!!errors[name]}
        autoComplete="off"
      >
        <option>{placeholder}</option>

        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  )
}
