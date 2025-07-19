export default function Footer() {
    return (
        <footer className="bg-green-950 text-white shadow-md">
            <div className="container mx-auto p-2 text-center text-gray-100">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Scrabdle. All rights reserved.
                </p>
                <p className="text-xs mt-2">
                    Built with Next.js and Tailwind CSS.
                </p>
            </div>
        </footer>
    )
}