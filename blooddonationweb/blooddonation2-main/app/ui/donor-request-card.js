export default function DonorRequestCard({ request }) {
  // Destructure
  const {
    rname,
    bloodgroup,
    unite,
    urgency,
    date,
    time,
    hospitalname,
    district,
    status,
  } = request;

  return (
    <>
      <div className="bg-gray-100 p-4 m-2 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold">{rname}</h4>
          <span className="text-sm text-gray-500">
            {`${urgency}   [${bloodgroup}]`}
          </span>
        </div>
        <p className="text-gray-600">
          {unite} units of blood needed at {hospitalname} ({district}) on {date}{" "}
          at {time}
        </p>
        {/* Optionally display date and time if needed */}
        <p className="text-gray-600">
          status: {status ? status : "NOT UPDATED"},
        </p>
      </div>
    </>
  );
}
