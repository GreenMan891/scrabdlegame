import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-green-950 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
            <Link href="/" className="text-2xl font-bold">
                Scrabdle (Working Title)
            </Link>
            <ul className="flex space-x-6">
                <li>
                <Link href="/" className="hover:text-green-100 transition-colors">
                    Home
                </Link>
                </li>
                <li>
                <Link href="/about" className="hover:text-green-100 transition-colors">
                    How to Play
                </Link>
                </li>
            </ul>
            </div>
        </header>
    );
}