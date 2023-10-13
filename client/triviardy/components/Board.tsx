import Square from "./Square"

export default function Board() {
  const board = [];

  for (let i = 0; i < 16; i++)
    board.push(i);

  return (
    <div className="grid w-4/6 h-96 grid-rows-4 grid-cols-4 ml-auto mr-auto bg-slate-200">
      {board.map((question, i) => 
        <Square key={i}></Square>
      )}
    </div>
  )
}