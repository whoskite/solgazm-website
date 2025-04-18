"use client";
import { Navigation } from '@/components/Navigation';

export default function ProfilePage() {

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Correct Background Image */}
      <div className="absolute inset-0 -z-10 bg-black bg-cover bg-fixed" style={{backgroundImage: "url('/Background_worldofgazm.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1}} />

      {/* Navigation header */}
      <Navigation />

      {/* Profile content centered below header */}
      <main className="flex flex-col items-center justify-center pt-32 pb-16">
        <div className="w-full max-w-xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Profile</h1>
          <div className="flex justify-center mb-4">
            <img 
              src="/Profile_Stand_WorldofGazm.png" 
              alt="World of Gazm Profile Stand" 
              className="max-w-xs w-full h-auto object-contain drop-shadow-lg rounded-lg"
              style={{maxWidth: '320px'}}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
