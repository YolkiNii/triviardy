import { ITriviardyPlayers } from "./Lobby";

export default function Players({ players }: { players: ITriviardyPlayers }) {
  return (
    <div className="flex justify-center mt-10">
      {Object.keys(players).map(id => {
        return (
          <div key={id}>
            <p className="font-medium text-center">{players[id].username}</p>
            <div className="flex justify-center border-2 border-sky-600 rounded-md w-28 bg-slate-200">
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