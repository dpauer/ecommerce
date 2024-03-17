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
export default function CategoryForm({
  onSubmitHandler,
  data,
  setData,
  errors,
}: Props): JSX.Element {
  return (
    <Form onSubmit={onSubmitHandler}>
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
