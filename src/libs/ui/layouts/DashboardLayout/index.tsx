import { ReactNode, memo } from "react";
import { Box, Container, Stack } from "@mui/material";

// Theme
import { themeDefault } from "../../themes";

// Components
import { Footer, Logo, NavigationBar } from "../../components";

interface DashboardLayoutProps {
  children: ReactNode;
  onNavigate?: (path: string) => void;
}

const DashboardLayout = ({ children, onNavigate }: DashboardLayoutProps) => (
  <Container>
    <Stack flexDirection="row" height="100vh">
      <Stack
        flex={1}
        sx={{
          maxWidth: {
            xs: 77,
            sm: 102,
            lg: 306,
          },
          padding: {
            xs: "40px 16px",
            sm: "40px 28px",
          },
        }}
      >
        <Box marginBottom="53px">
          <Logo />
        </Box>
        <NavigationBar onNavigate={onNavigate} />
        <Box marginTop="auto">
          <Footer />
        </Box>
      </Stack>

      <Stack
        flex={1}
        sx={{
          height: "100%",
          backgroundColor: themeDefault.palette.secondary.main,
          padding: { xs: "40px 20px 80px 20px", md: "40px 95px 80px 70px" },
        }}
      >
        <Box>{children}</Box>
      </Stack>
    </Stack>
  </Container>
);

export default memo(DashboardLayout);
