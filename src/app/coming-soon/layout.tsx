import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Coming Soon',
  description: 'This feature is coming soon. Stay tuned for updates from Criss Cross Ltd.',
  noIndex: true,
});

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
