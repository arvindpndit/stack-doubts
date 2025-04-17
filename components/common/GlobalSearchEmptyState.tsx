import { TbTag, TbUser, TbHelpCircle } from 'react-icons/tb';

export default function GlobalSearchEmptyState() {
  const options = [
    {
      icon: <TbTag className="text-orange-500 text-2xl md:text-3xl" />,
      title: 'Explore Tags',
      description: 'Find questions by topics and discover trending tags.',
    },
    {
      icon: <TbUser className="text-orange-500 text-2xl md:text-3xl" />,
      title: 'Find Users',
      description: 'Search users by name or expertise to connect or follow.',
    },
    {
      icon: <TbHelpCircle className="text-orange-500 text-2xl md:text-3xl" />,
      title: 'Browse Questions',
      description: 'Look through all questions to find what you need.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center mb-16 md:mb-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Let's Search
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
        Search globally to find tags, users, and questions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {options.map(({ icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-4 items-start p-4 rounded-3xl border border-gray-200 dark:border-gray-700  transition-colors hover:shadow-md "
          >
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0 bg-orange-100 dark:bg-gray-600 rounded-full p-2 mr-4">
                {icon}
              </div>
              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

