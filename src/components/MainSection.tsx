import React from 'react'

 const  MainSection = () => {
  return (
    <section className="relative bg-gray-900 h-[600px] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="Barbershop Interior"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <img
          src="/stayfresh.svg"
          alt="Stay Fresh"
          className="w-64 md:w-80 mb-6"
        />
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          Premium Barbering Experience
        </h1>
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mb-8">
          Where style meets precision. Our skilled barbers deliver exceptional
          cuts and grooming services in a modern, comfortable environment.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="#booking"
            className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Book Your Appointment
          </a>
          <a
            href="/team"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
          >
            Our Team
          </a>
        </div>
      </div>
    </section>
  )
}

export default MainSection;
