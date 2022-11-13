import RecruitmentWriteSection from "components/pages/recruitments/sections/RecruitmentWriteSection";
import useAuthPage from "hooks/useAuthPage";

function WritePage() {
  const loading = useAuthPage();

  if (loading) return "loading...";

  return (
    <>
      <RecruitmentWriteSection />
    </>
  );
}

export default WritePage;
