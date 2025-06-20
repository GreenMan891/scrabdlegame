export default function Footer() {
    return (
        <footer className="bg-green-950 text-white shadow-md">
            <div className="container mx-auto p-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Scrabdle (Working Title). All rights reserved.
                </p>
                <p className="text-xs mt-2">
                    Built with Next.js and Tailwind CSS.
                </p>
            </div>
        </footer>
    )
}