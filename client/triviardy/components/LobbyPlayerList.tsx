import { IPlayers } from "./Lobby";
import useUser from "@/hooks/useUser";

interface ILobbyPlayerListProps {
  players: IPlayers;
}

export default function LobbyPlayerList({ players }: ILobbyPlayerListProps) {
  const {user} = useUser();

  return (
    <div className="flex flex-col border-2 border-gray-500 rounded w-[150px] mx-2 items-center">
      <h3 className="font-semibold bg-slate-200 w-full text-center">Players</h3>
      {Object.keys(players).map(id => (
        <p key={id} className={`mt-1 ${user.id === players[id].id  ? "font-medium" : ""}`}>{players[id].username}</p>
      ))}
    </div>
  );
}