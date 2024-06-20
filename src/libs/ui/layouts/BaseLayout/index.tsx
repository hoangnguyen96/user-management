import { memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Layouts
import DashboardLayout from "../DashboardLayout";

const BaseLayout = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout onNavigate={navigate}>
      <Outlet />
    </DashboardLayout>
  );
};

export default memo(BaseLayout);
