import { MdMoreHoriz } from "react-icons/md"

const Cart = ({type,count}:{type:string | undefined, count:string}) => {
  return (
    <div className='rounded-2xl odd:bg-tekoPurple even:bg-tekoYellow p-4 flex-1 min-w-[130px]'>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">{Intl.DateTimeFormat("tr-TR").format(Date.now())}</span>
        <MdMoreHoriz />
      </div>
      <h1 className="text-2xl font-bold my-4">{count}</h1>
      <h1>{type}</h1>
    </div>
  ) 
}

export default Cart