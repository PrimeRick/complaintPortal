export default function Button({onClick, label}){
  return (
      <button onClick={onClick} type="button" class="btn btn-secondary" className="bg-green-400 w-10 h-7 hover:bg-green-500 active:bg-green-600">
          {label}
      </button>
  )
}