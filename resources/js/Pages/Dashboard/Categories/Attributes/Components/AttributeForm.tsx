import InputTypeSelectAttributeType from "@/Components/DataEntry/InputTypeSelectAttributeType"
import InputTypeText from "@/Components/DataEntry/InputTypeText"
import SubmitButton from "@/Components/DataEntry/SubmitButton"
import { FormEventHandler } from "react"
import Form from "react-bootstrap/Form"

export interface Props {
  onSubmitHandler: FormEventHandler
  data: any
  setData: any
  errors: any
}
export default function AttributeForm({
  onSubmitHandler,
  data,
  setData,
  errors,
}: Props): JSX.Element {
  return (
    <Form onSubmit={onSubmitHandler}>
      <InputTypeSelectAttributeType
        label="Type"
        placeholder="Select type"
        name="type"
        data={data}
        setData={setData}
        errors={errors}
      />

      <InputTypeText
        label="Name"
        placeholder="Enter name"
        name="name"
        data={data}
        setData={setData}
        errors={errors}
      />

      <SubmitButton />
    </Form>
  )
}
