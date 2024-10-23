import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="display-4">Có vẻ bạn gặp một số lỗi.</h1>
        <p className="lead">{error?.message || error?.statusText || "Đã có lỗi xảy ra"}</p>
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            <ArrowUturnLeftIcon width={20} />
            <span>Quay lại</span>
          </button>
          <Link to="/" className="btn btn-primary">
            <HomeIcon width={20} />
            <span>Về trang chính</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
