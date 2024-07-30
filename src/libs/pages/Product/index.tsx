import { useAuthStore } from "@app/stores";
import { Typography } from "@mui/material";
import {
  ErrorBoundary,
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
      <ErrorBoundary
        fallback={
          <Typography>Oops! An error occurred in Product component.</Typography>
        }
      >
        <ListProductContent isAdmin={isAdmin} id={user.id} />
      </ErrorBoundary>
    </>
  );
};
export default Product;
