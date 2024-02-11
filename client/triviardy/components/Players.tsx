import { ITriviardyPlayers } from "./Lobby";

export default function Players({ players }: { players: ITriviardyPlayers }) {
  return (
    <div className="flex justify-center mt-10">
      {Object.keys(players).map(id => {
        return (
          <div key={id} className="flex justify-center border-2 border-sky-600 rounded-md w-20">
            {`${players[id].id}`}
          </div>
        )
      })}
    </div>
  );
}