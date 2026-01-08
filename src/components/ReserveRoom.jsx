import { useLocation } from "react-router-dom";

const Reserve = () => {
  const location = useLocation();
  const { id, image, name, price } = location.state || {}; // Destructure room details

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut(null);
    }
  }, [checkIn]);

  return (
    <div>
      <div className="sm:pt-40 sm:pb-20 py-20 lg:px-20 bg-gray-200 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-5">
          <div className="flex-[2] bg-white shadow-lg rounded-xl p-6 w-full">
            {/* Room Details */}
            <div className="mb-6 ">
              <img src={image} alt={name} className="w-full rounded-xl" />
              <h2 className="text-2xl font-bold mt-4">{name}</h2>
              <p className="text-lg font-semibold text-gray-600">${price} / night</p>
            </div>

            {/* Reservation Form */}
            <form id="reservationForm" className="flex flex-col gap-5">
              {/* Existing Form Code */}
            </form>
          </div>

          {/* Reservation Summary */}
          <div className="flex-1 sm:max-w-[350px] bg-white shadow-lg rounded-xl p-3 sticky top-40 w-full gap-2">
            <h2 className="text-lg mb-4 font-semibold">Reservation Summary</h2>
            <div className="mb-4 border border-gray-300 p-3 rounded flex flex-col gap-4 justify-between">
              <div className="flex justify-between">
                <div className="flex flex-col w-full gap-2">
                  <p className="text-xs">CHECK-IN:</p>
                  <p className="text-xs font-semibold">
                    {checkIn ? checkIn.toLocaleDateString() : "Select a date"}
                  </p>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <p className="text-xs">CHECK-OUT:</p>
                  <p className="text-xs font-semibold">
                    {checkOut ? checkOut.toLocaleDateString() : "Select a date"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <p className="text-xs">TOTAL LENGTH OF STAY:</p>
                <p className="text-xs font-semibold">
                  {checkIn && checkOut
                    ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) + " nights"
                    : "Select dates"}
                </p>
              </div>

              <div className="flex flex-col w-full gap-2">
                <p className="text-xs">YOU SELECTED:</p>
                <p className="text-xs font-semibold">{name}</p>
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Your Price Summary</h2>

              <div className="flex flex-row w-full justify-between">
                <p className="text-xs">Rooms & Offers:</p>
                <p className="text-xs font-semibold">${price}</p>
              </div>

              {/* Extras and Total Calculation Here */}
            </div>

            <button
              type="submit"
              form="reservationForm"
              className="bg-[#01234e] text-white w-full py-2 rounded-[10px] transition-all mt-4 text-sm"
            >
              Request to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
