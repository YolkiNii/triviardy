import useUser from "@/hooks/useUser";
import { categories, APICategories } from "@/utils/categories";
import baseAPI from "@/api/base";
import { useState } from "react";
import useRoomID from "@/hooks/useRoomID";

const TRIVIA_API_URL = "/games/triviardy";

export default function GameSetup() {
  const roomID = useRoomID();
  const [errorMsg, setErrorMsg] = useState("");
  const [checkedCategories, setCheckedCategories] = useState(
    new Array(categories.length).fill(false)
  );
  const {user} = useUser();

  const handleOnChange = (position: number) => {
    setErrorMsg("");
    const updatedCheckedCategories = checkedCategories.map((check, index) => {
      return index === position ? !check : check;
    });

    setCheckedCategories(updatedCheckedCategories);
  }

  const handleOnGameStart = async () => {
    // Check which categories are sent
    const selected = APICategories.filter((category, index) => {
      return checkedCategories[index];
    });

    console.log(selected);

    // Check if no categories are selected
    if (selected.length === 0) {
      setErrorMsg("No categories selected");
      return;
    }

    // Create game
    try {
      await baseAPI.post(`${TRIVIA_API_URL}/${roomID}`, 
      JSON.stringify({ "catagories": selected })
      );
    }
    catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong when creating game.");
    }
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 mr-auto">
      {user.host ? (
        <div className="flex flex-col items-center w-[180px] border-slate-400 border-2 rounded-md">
          <h2 className="font-semibold text-center bg-slate-200 w-full">Game Settings</h2>
          {categories.map((name, index) => {
            return (
              <label className="flex self-start ml-1">
                <input
                  className="mr-1"
                  type="checkbox"
                  name={name}
                  checked={checkedCategories[index]}
                  onChange={() => handleOnChange(index)}
                />
                {name}
              </label>
            );
          })}
          {errorMsg && <p>{errorMsg}</p>}
          <button 
            className="text-lg font-medium my-2 border-2 px-2 border-black rounded-md bg-amber-300 hover:bg-amber-400"
            onClick={handleOnGameStart}
          >
            Start Game!
          </button>
        </div>
      ) : (
        <h1 className="font-semibold">Wait for host to start game.</h1>
      )}
    </div>
  )
}