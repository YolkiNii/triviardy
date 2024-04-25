import { TriviardyPlayerType } from "@/types/TriviardyPlayerType";
import { ITriviardyPlayers } from "./Lobby";
import socket from "@/services/socket";
import clsx from "clsx";
import useRoomID from "@/hooks/useRoomID";

export default function Results({players}: {players: ITriviardyPlayers,}) {
  const roomID = useRoomID();
  const results: TriviardyPlayerType[] = Object.entries(players)
                                          .sort((a, b) => b[1].score - a[1].score)
                                          .reduce((acc: TriviardyPlayerType[], cur) => [...acc, cur[1]], []);

  function handleStartNewGame() {
    const data = {
      roomID
    }

    socket.emit("game:request_start_new", data);
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex justify-center items-end mb-3">
        {results.map((player, index) => {
          return (
            <div key={player.id} className={clsx("flex flex-col justify-end mx-1",
              {
                "h-32": index === 0,
                "h-24": index === 1,
                "h-16": index === 2,
                "h-12": index >= 2
              }
            )}>
              {index < 3 ? (
                <p className={clsx(
                  "text-center",
                  {
                    "text-xl font-semibold": index === 0,
                    "text-base font-medium": index === 1,
                    "text-sm": index === 2
                  }
                )}>{index + 1}</p>
              ) : null}
              <div key={player.id} className={clsx(
                "flex flex-col justify-center border-2 rounded-md w-28 bg-slate-200 h-5/6",
                {
                  "border-amber-300 bg-amber-100": index === 0,
                  "border-zinc-300 bg-gray-200": index === 1,
                  "border-yellow-700 bg-yellow-500": index === 2
                }
              )}>
                <p className="text-center">{player.username}</p>
                <p className="text-center">{player.score}</p>
              </div>
            </div>
          )
        })}
      </div>
      <button 
        className="text-xl font-medium text-center border-2 p-2 rounded-md border-black bg-amber-300 hover:bg-amber-400 hover:pointer"
        onClick={() => handleStartNewGame()}
      >
        Start New Game
      </button>
    </div>
  )
}