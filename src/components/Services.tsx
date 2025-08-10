import { Scissors, Ruler } from "lucide-react";
import { Icon } from 'lucide-react';
import { towelFolded } from '@lucide/lab';
import Header from "./Header";


const Services = () => {
  const services = [
    {
      title: 'Haircut',
      description: 
        'Precision cut tailored to your style and preference by our exprer barbers',
      price: '$30',
      icon: < Scissors className="h-8 w-8 text-blue-500"/>
    },
    {
      title: 'Beard Trim',
      description:
        'Shaping and trimming to keep your beard looking its absolute best',
      price: '$15',
       icon: < Scissors className="h-8 w-8 text-blue-500"/>
    },
    {
      title: 'Haircut & Beard Combo',
      description: 
         'Complete grooming package for the modern gentleman',
      price: '$40',
      icon: <Ruler className="h-8 w-8 text-blue-500"/>
    },
    {
      title: 'Hot Towel Shave',
      description: 'Classic hot towel shave experience with premium products.',
      price: '$35',
      icon: <Icon iconNode={towelFolded} className="h-8 w-8 text-blue-500" />
    },
  ]
  return(
    <>
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We offer a range of professional barbering services to keep you looking your best.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">{service.title}</h3>
            <p className="text-gray-600 md-4">{service.description}</p>
            <p className="text-blue-500 font-bold text-xl">{service.price}</p>
          </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#booking" className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors">
            Book Your Service
          </a>
        </div>
      </div>
    </section>
    </>
  )
}

export default Services;