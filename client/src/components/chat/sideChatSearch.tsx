import React from "react";

interface sideChatSearch {
  users: any[];
  selId: string | null;
  setSelId: (e: string | null) => void;
}

const SideChatSearch: React.FC<sideChatSearch> = ({
  users,
  selId,
  setSelId,
}) => {
  return (
    <div className="mt-8">
      <div className="h-auto py-2 pr-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer">
        {users
          ? users.map((user, i) => (
              <div
                className="grid grid-cols-8  gap-x-2 w-full"
                onClick={() => {
                  setSelId(user._id);
                }}
                key={i}
              >
                <div
                  className="col-span-2 flex items-center justify-center"
                  key={i}
                >
                  <img
                    className="h-16 w-16 object-cover rounded-full"
                    src={user.pfpLink}
                    alt={"pfp"}
                  />
                </div>
                <div className="col-span-6">
                  <div className="flex items-center mb-1">
                    <div className="">
                      {user.name} {user.lastName}
                    </div>
                    <div className="ml-auto text-gray-400 text-xs">23 feb</div>
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {user.firstPost?.serviceOfred?.[0]}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SideChatSearch;
