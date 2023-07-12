import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default function Home() {
  return (
    <main>
      <h1 className="text-rose-500 text-2xl">Welcome</h1>
    </main>
  );
}
