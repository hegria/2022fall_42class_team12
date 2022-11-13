import AccountModifySection from "components/pages/account/sections/AccountModifySection";
import useAuthPage from "hooks/useAuthPage";

function AccountPage() {
  const loading = useAuthPage();

  if (loading) return "loading...";
  return (
    <>
      <AccountModifySection />
    </>
  );
}

export default AccountPage;
