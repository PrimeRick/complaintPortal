export default function Button({onClick, label}){
  return (
      <button onClick={onClick} type="button" class="btn btn-secondary">
          {label}
      </button>
  )
}