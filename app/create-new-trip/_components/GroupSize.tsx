

export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole travels in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '💑',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '⛰️',
        people: '5 to 10 People'
    }
]

const GroupSize = ({ onSelectOption }: any) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center mt-1'>
            {SelectTravelsList.map((item, index) => (
                <div key={item.id} className="p-3 rounded-2xl
                 bg-white hover:border-primary cursor-pointer"
                    onClick={() => onSelectOption(item.title + ':' + item.people)}
                >
                    <h2>{item.icon}</h2>
                    <h2>{item.title}</h2>
                    {/* <span className="text-2xl mr-4">{item.icon}</span> */}
                </div>
            ))}
        </div>
  )
}

export default GroupSize