import { Form } from "remix";
import { Post } from "../services/postsService";
import { Input } from "./Input";

interface PostFormProps {
  disabled: boolean;
  buttonText: string;
  initialValues?: Post;
  errors?: { [key in keyof Post]: boolean };
}

export function PostForm({
  disabled,
  buttonText,
  initialValues,
  errors,
}: PostFormProps): JSX.Element {
  return (
    <Form method="post" className="form card">
      <Input
        disabled={disabled}
        error={errors?.name}
        name="name"
        defaultValue={initialValues?.name ?? ""}
        label="Name"
      />
      <Input
        disabled={disabled}
        error={errors?.content}
        multiline
        name="content"
        defaultValue={initialValues?.content ?? ""}
        label="Content"
      />
      <Input
        error={errors?.src}
        defaultValue={initialValues?.src ?? ""}
        label="File path"
        name="src"
      />
      <button disabled={disabled} type="submit">
        {buttonText}
      </button>
    </Form>
  );
}
