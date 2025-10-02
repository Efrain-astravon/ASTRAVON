export const dynamic = "force-dynamic";

import Navbar from "./__components/Navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
