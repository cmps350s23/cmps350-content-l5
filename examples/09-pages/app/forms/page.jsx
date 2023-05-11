import FriendsList from "./FriendsList";
import LoginForm from "./LoginForm";
import ProductForm from "./ProductForm";

export default async function FormsPage() {
  return (
    <>
      <LoginForm />
      <FriendsList />
      <ProductForm />
    </>
  );
}
