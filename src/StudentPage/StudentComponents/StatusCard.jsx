import React from "react";

const StatusCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 xl:px-20">
  {/* Card 1 */}
  <div className="bg-blue-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
    <h1 className="text-4xl font-bold">0</h1>
    <p className="mt-2 text-lg font-medium">Pending</p>
  </div>

  {/* Card 2 */}
  <div className="bg-yellow-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
    <h1 className="text-4xl font-bold">1</h1>
    <p className="mt-2 text-lg font-medium">In Progress</p>
  </div>

  {/* Card 3 */}
  <div className="bg-green-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
    <h1 className="text-4xl font-bold">2</h1>
    <p className="mt-2 text-lg font-medium">Resolved</p>
  </div>
</div>

  );
};

export default StatusCard;
