import ServiceCard from "./serviceCard";
import Link from "next/link";

const Services = () => {
  const features = [
    {
      title: "Spaced Repetition",
      description:
        "Our intelligent system helps you review words at optimal intervals to maximize long-term retention.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 5a2 2 0 012-2h4.586A2 2 0 0112 3.586L15.414 7A2 2 0 0116 8.414V15a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 0v10h8V8.414L10.586 5H6z"/>
        </svg>
      ),
    },
    {
      title: "Personalized Learning",
      description:
        "Adaptive learning paths that adjust to your progress and learning style for maximum efficiency.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
      ),
    },
    {
      title: "Progress Analytics",
      description:
        "Detailed insights into your learning journey with visual progress tracking and performance metrics.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      ),
    },
    {
      title: "Context Learning",
      description:
        "Learn words in real context with example sentences, usage notes, and memory aids.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Features for Effective Learning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our scientifically-proven methods help you learn and retain vocabulary more effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ServiceCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/auth/signin"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Start Learning Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
