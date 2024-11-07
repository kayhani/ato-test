const Messages = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
         <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Mesajlar</h1>
            <span className="text-xs text-gray-400">Hepsini gör</span>
         </div>
         <div className="flex flex-col gap-4 mt-4">
                <div className="bg-tekoSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            01/01/2025
                        </span>

                    </div>
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="bg-tekoPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            01/01/2025
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Unde dicta quam perspiciatis aut nemo ipsa esse recusandae fuga quo cupiditate?
                    </p>
                </div>
                <div className="bg-tekoYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Lorem ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                            01/01/2025
                        </span>

                    </div>
                    <p className="text-sm text-gray-500">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Unde ratione voluptate,
                    </p>
                </div>
            </div>
    </div>
  )
}

export default Messages