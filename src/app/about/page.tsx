import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Scrabdle",
    description: "Learn how to play Scrabdle",
};

export default function AboutPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">How to Play Scrabdle</h1>
            <p className="text-lg text-gray-700 mb-4">
                Scrabdle is a daily word game where players compete to create the highest scoring board of words that day.
                <br />
                What constitutes a high scoring word changes daily, so players must adapt their strategies to the current day's rules.
                <br />
                Rules can include:
                <ul className="list-disc list-inside mb-4">
                    <li>X letter words score double points</li>
                    <li>Themed words score double points</li>
                    <li>Letter values changing daily</li>
                    <li>Types of words scoring more points (palindromes, anagrams, etc.)</li>
                    <li>Proper nouns enabled or disabled</li>
                </ul>
                Scores are shown on a high score leaderboard, and players can see how they rank against others.
                <br />
                How long it took players to complete the game is also shown, so there is a competition in speed as well as points.
            </p>
        </div>
    );
}