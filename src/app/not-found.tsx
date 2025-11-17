import Link from 'next/link';
import { Home, Package, Phone, ArrowRight } from 'lucide-react';
import { GradientText } from '@/components/ui/gradient-text';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist. Browse our wholesale FMCG products or contact us.",
  noIndex: true,
});

export default function NotFound() {
  const navigationOptions = [
    {
      icon: Home,
      label: 'Return Home',
      href: '/',
      description: 'Back to our homepage',
    },
    {
      icon: Package,
      label: 'Browse Products',
      href: '/products',
      description: 'Explore our FMCG catalog',
    },
    {
      icon: Phone,
      label: 'Contact Us',
      href: '/contact',
      description: 'Get in touch with our team',
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-zinc-50 via-blue-50/30 to-indigo-100/20 dark:from-zinc-900 dark:via-blue-950/30 dark:to-indigo-900/20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* Large gradient 404 number */}
          <h1 className="text-8xl sm:text-9xl font-bold mb-6 tracking-tight" aria-label="Error 404">
            <GradientText variant="primary">404</GradientText>
          </h1>

          {/* Professional messaging for B2B context */}
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. The page may have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Navigation options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {navigationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.href}
                href={option.href}
                className="group relative flex flex-col items-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[1.618rem] border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 dark:hover:shadow-gray-800/50 hover:scale-105"
              >
                {/* Icon with gradient background */}
                <div className="mb-4 p-4 rounded-[1.618rem] bg-gradient-to-b from-blue-700 to-blue-400 dark:from-blue-400 dark:to-blue-600 text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                {/* Label and description */}
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {option.label}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {option.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Optional help text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Need assistance? Our team is here to help.{' '}
            <Link
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
