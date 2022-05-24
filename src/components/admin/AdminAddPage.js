import Heading from "../layout/Heading";
import AdminAddForm from "./AdminAddForm";

export default function AdminAddPage() {
  return (
    <div className="add-container">
      <Heading content="Add New Accommodation" />
      <AdminAddForm />
    </div>
  );
}

