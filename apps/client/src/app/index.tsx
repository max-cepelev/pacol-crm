import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";
import InfoModal from "./components/modals/InfoModal";
import BackdropLoading from "./components/ui/BackdropLoading";
import Drawer from "./components/ui/Drawer";
import Toolbar from "./components/ui/Toolbar";
import DistributorEditDialog from "./features/distributors/DistributorEditDialog";
import useAuthService from "./hooks/api/useAuthService";
import { useSettingsStore } from "./store/useSettingsStore";

export default function App() {
  const menu = useSettingsStore((store) => store.menu);
  const { check, checkLoading } = useAuthService();

  useEffect(() => {
    check();
  }, []);

  return (
    <div className={`app${menu ? " open" : ""}`}>
      <Drawer>
        <Menu />
      </Drawer>
      <Toolbar />
      <main className="container">
        <BackdropLoading open={checkLoading} />
        {!checkLoading && <Outlet />}
      </main>
      <DistributorEditDialog />
      <InfoModal />
    </div>
  );
}
