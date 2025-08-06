import { circleDollarSign } from "@lucide/lab"

const TeamSection = () => {

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Master Barber',
      img: "/barber1.jpg",
      description:
        'With 10+ years of experience, Alex specializes in classic cuts with modern twists.'
    },
    {
      name: 'Marcus Riviera',
      role: 'Style Specialist',
      img: "/barber2.jpg",
      description:
        'Marcus is known for his creative fades and precision beard grooming'
    },
    {
      name: 'Isabella Imogen',
      role: 'Senior Barber',
      img: '/barber3.jpg',
      description: 
        'With over 8 years behind the chair, Isabella blends precision cutting with creative flair'
    }
  ]

  return(
    <>
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
       <div className="text-center mb-16">
         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Meet our Expert Team
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our Skilled barbers are passionate about their craft and dedicated to giving you the perfect look
        </p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {team.map((member, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-80 overflow-hidden">
              <img
              src={member.img}
              alt={member.name}
              className="w-full h-100 object-cover"
              />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
          </div>
        ))}
       </div>

      </div>

    </section>

    </>
  )
}

export default TeamSection