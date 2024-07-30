import { useAuthStore } from "@app/stores";
import {
  ErrorBoundary,
  HeadingContent,
  ListCustomersContent,
  TitleContent,
} from "@app/ui/components";
import { Typography } from "@mui/material";

const Customers = () => {
  const [isAdmin, user] = useAuthStore((state) => [state.isAdmin, state.user]);

  return (
    <>
      <TitleContent name={user.fullName} />
      <HeadingContent />
      <ErrorBoundary
        fallback={
          <Typography>
            Oops! An error occurred in Customers component.
          </Typography>
        }
      >
        <ListCustomersContent isAdmin={isAdmin} id={user.id} />
      </ErrorBoundary>
    </>
  );
};

export default Customers;
