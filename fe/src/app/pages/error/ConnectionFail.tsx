import { FC } from "react";

type ConnectionFailProps = {
  retryConnection: () => void;
};

export const ConnectionFail: FC<ConnectionFailProps> = ({
  retryConnection,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-2xl font-bold text-red-600">Connection Failed</h1>
      <p className="mt-2 text-gray-600">
        We couldn’t establish a connection to the server.
      </p>
      <button
        onClick={retryConnection}
        className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
};
