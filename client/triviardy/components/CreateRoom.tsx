export default function CreateRoom() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <p className="text-3xl font-semibold text-center mb-1">Triviardy</p>
      <input 
        type="text" 
        placeholder="Enter your username"
        className="text-center text-base rounded-md py-3 mb-1"
      />
      <button className="text-xl font-medium text-center border-2 p-2 rounded-md border-black bg-amber-300 hover:bg-amber-400">Create Room</button>
    </div>
  )
}