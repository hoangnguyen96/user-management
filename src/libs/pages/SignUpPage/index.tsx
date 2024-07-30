import { lazy, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";

// Constants
import { USER_ROLE } from "@app/constants";

// Api
import { useCreateCustomer } from "@app/api";

// Models
import { UserResponse } from "@app/models";

// Utils
import { customUsername } from "@app/utils";

// Components
import { ErrorBoundary, FormController } from "@app/ui/components";

const ModalCreateUserSuccess = lazy(
  () => import("@app/ui/components/Modal/ModalCreateUserSuccess")
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isPending: isLoadingCreate, mutate: createUser } =
    useCreateCustomer();

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleCreateUserSuccess = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleCreateUserFailed = useCallback(
    () => alert("Create User failed!"),
    []
  );

  const handleSubmit = useCallback((values: Partial<UserResponse>) => {
    const { fullName, phoneNumber, company, country, email } = values;

    const payload: Partial<UserResponse> = {
      ...values,
      role: USER_ROLE.CONSUMER,
      fullName: fullName,
      company: company,
      phoneNumber: phoneNumber,
      email: email,
      country: country,
      username: customUsername(),
      password: "123456",
    };

    setUser((prev) => ({
      ...prev,
      username: payload.username || "",
      password: payload.password || "",
    }));

    createUser(payload, {
      onSuccess: handleCreateUserSuccess,
      onError: handleCreateUserFailed,
    });
  }, []);

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "500px",
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            variant="h1"
            lineHeight="60px"
            textTransform="uppercase"
            textAlign="center"
            fontSize={{ xs: "30px", sm: "45px" }}
            my="10px"
          >
            Sign Up!
          </Typography>
          <Divider orientation="horizontal" flexItem />

          {/* Form SignUp */}
          <ErrorBoundary
            fallback={
              <Typography>
                Oops! An error occurred in SignUp component.
              </Typography>
            }
          >
            <FormController
              itemUpdate={{}}
              isLoading={isLoadingCreate}
              onNavigate={navigate}
              onSubmit={handleSubmit}
            />
          </ErrorBoundary>
        </Box>
      </Stack>
      <ModalCreateUserSuccess
        isOpen={isOpenModal}
        username={user.username}
        password={user.password}
        onClose={handleCloseModal}
      />
    </>
  );
};
export default SignUpPage;
