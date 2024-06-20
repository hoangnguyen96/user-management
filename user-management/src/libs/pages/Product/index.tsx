import { useAuthStore } from "@app/stores";
import {
  HeadingContent,
  ListProductContent,
  TitleContent,
} from "@app/ui/components";

const Product = () => {
  const [isAdmin, user] = useAuthStore((state) => [state.isAdmin, state.user]);

  return (
    <>
      <TitleContent name={user.fullName} />
      <HeadingContent />
      <ListProductContent isAdmin={isAdmin} id={user.id} />
    </>
  );
};
export default Product;
