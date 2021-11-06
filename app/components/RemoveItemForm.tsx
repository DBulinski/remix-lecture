import { Form } from "remix";
import { Cross } from "../icons/Cross";

interface RemoveItemFormProps {
  id: number;
}

export function RemoveItemForm({ id }: RemoveItemFormProps) {
  return (
    <Form method="post" action={`/admin/posts?id=${id}`}>
      <button
        onClick={(e) => e.stopPropagation()}
        type="submit"
        className="remove-button"
      >
        <Cross />
      </button>
    </Form>
  );
}
