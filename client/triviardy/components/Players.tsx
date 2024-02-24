import { ITriviardyPlayers } from "./Lobby";
import clsx from "clsx";

export default function Players({ players, turnPlayerID }: { players: ITriviardyPlayers, turnPlayerID: number }) {
  return (
    <div className="flex justify-center mt-10">
      {Object.keys(players).map(id => {
        return (
          <div key={id}>
            <p className="font-medium text-center">{players[id].username}</p>
            <div className={clsx(
              "flex justify-center border-2 rounded-md w-28 bg-slate-200",
              {
                "border-sky-600": players[id].id !== turnPlayerID,
                "border-blue-400": players[id].id === turnPlayerID
              },
            )}>
              <div className="flex justify-center mx-3 my-3 bg-white w-11/12">
                {players[id].score}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}