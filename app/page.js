'use client';
import Link from 'next/link'  

export default function Home() {
  return (
      <div className="bg-black-400 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">D&D5e Compendium</h1>
          <p className="text-lg text-gray-600">
            Cool thing for D&D 5e. Not complete in many ways. I wouldn't use this in your game.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Explore all of two amazingly integrated categories. Powered by dnd5eapi.co.
          </p>
          <ul className="list-disc text-left text-gray-600">
            <li><Link href="/spells">Spells</Link></li>
            <li><Link href="/classes">Classes</Link></li>
            <li><Link href="/userpage">Log In (Doesn't actually work)</Link></li>
            <li>What</li>
          </ul>
        </div>
      </div>
  );
}
