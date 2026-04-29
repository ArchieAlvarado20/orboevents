import ComingSoon from "@/components/shared/ComingSoon";
import Topbar from "@/components/shared/usersPage/topbar";

export default function Organizer() {
  return (
    <>
      <Topbar active="organizers" />
      <div className="max-w-container-max mx-auto">
        {/* <!-- Page Header --> */}
        <div className="mb-0 space-y-1">
          <ComingSoon />
        </div>
      </div>
    </>
  );
}
