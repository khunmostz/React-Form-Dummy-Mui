import * as React from "react";
import Drawer from "../component/Drawer";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import { ToastContainer, toast } from "react-toastify";
export default function User() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  const { columns, useQuery } = createFakeServer();
  const [queryOptions, setQueryOptions] = React.useState({});

  const onFilterChange = React.useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const { isLoading, data } = useQuery(queryOptions);
  const notifySuccess = (message) => toast.success(message);
  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  React.useEffect(() => {
    notifySuccess("Authentication Successful!");
  }, []);
  return (
    <Drawer>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          filterMode="server"
          onFilterModelChange={onFilterChange}
          loading={isLoading}
        />
      </div>
      <ToastContainer />;
    </Drawer>
  );
}
