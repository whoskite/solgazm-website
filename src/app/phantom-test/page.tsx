import { PhantomTest } from '@/components/PhantomTest';

export default function PhantomTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Phantom Wallet Connection Test</h1>
      <PhantomTest />
    </div>
  );
} 