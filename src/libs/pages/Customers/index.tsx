import { useAuthStore } from "@app/stores";
import {
  HeadingContent,
  ListCustomersContent,
  TitleContent,
} from "@app/ui/components";

const Customers = () => {
  const [isAdmin, user] = useAuthStore((state) => [state.isAdmin, state.user]);

  return (
    <>
      <TitleContent name={user.fullName} />
      <HeadingContent />
      <ListCustomersContent isAdmin={isAdmin} id={user.id} />
    </>
  );
};

export default Customers;
