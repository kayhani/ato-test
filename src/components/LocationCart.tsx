import { MdMoreHoriz } from "react-icons/md"

const LocationCart = ({type, lat, lon}:{type:string,lat:string, lon:string}) => {
  return (
    <div className='rounded-2xl odd:bg-tekoPurple even:bg-tekoYellow p-4 flex-1 min-w-[130px]'>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">{Intl.DateTimeFormat("tr-TR").format(Date.now())}</span>
        <MdMoreHoriz />
      </div>
      <h2 className="text-sm font-semibold my-4">Lat : {lat}</h2>
      <h2 className="text-sm font-semibold my-4">Lon : {lon}</h2>
      <h1>{type}</h1>
    </div>
  )
}

export default LocationCart