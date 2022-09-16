import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RoomDisplay = ({
  h,
  handleHotelDelete = ({ f }) => f,
  owner = false,
  showMoreButton = true,
}) => {
  console.log(h)
  const history = useNavigate();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotels/image/${h._id}`}
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+recomendation"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {h.hotel_name}
                <span className="float-right text-primary">NRS {h.price}</span>
              </h3>
              <p className="alert alert-info">{h.address}</p>
              <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>

              <div className="d-flex justify-content-between h4">
                {showMoreButton && (
                  <button
                    className="btn btn-primary"
                    onClick={() => history(`/hotel/${h._id}`)}
                  >
                    show more
                  </button>
                )}

                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined />
                    </Link>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleHotelDelete(h._id)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDisplay;
