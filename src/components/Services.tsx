import { Link } from "react-router-dom";
import { Bath, Ruler, Scissors, Sparkles } from "lucide-react";
import SERVICES from "./servicesData";

const Services = () => {
  const iconFor = (name: string) => {
    if (name.toLowerCase().includes("shave")) return <Bath className="h-8 w-8 text-blue-500" />;
    if (name.toLowerCase().includes("combo")) return <Ruler className="h-8 w-8 text-blue-500" />;
    if (name.toLowerCase().includes("beard")) return <Sparkles className="h-8 w-8 text-blue-500" />;
    return <Scissors className="h-8 w-8 text-blue-500"/>; 
  };

  const fmt = (n?: number) => (typeof n === "number" ? `$ ${n}` : "");

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We offer a range of professional barbering services to keep you looking your best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{iconFor(s.name)}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.name}</h3>
              {s.description && <p className="text-gray-600 mb-4">{s.description}</p>}
              <p className="text-blue-600 font-bold text-xl">
                {fmt(s.price)}
                {s.duration ? <span className="text-gray-500 text-sm"> • {s.duration} min</span> : null}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/appointments"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book Your Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
