<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FollowUp extends Controller
{
    public function getQuote()
    {
        $phrases = [
            "Believe you can and you're halfway there.",
            "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
            "Don’t watch the clock; do what it does. Keep going.",
            "The future depends on what you do today.",
            "Your limitation—it’s only your imagination.",
            "Push yourself, because no one else is going to do it for you.",
            "Great things never come from comfort zones.",
            "Dream it. Wish it. Do it.",
            "Success is what comes after you stop making excuses.",
            "Wake up with determination. Go to bed with satisfaction.",
            "Do something today that your future self will thank you for.",
            "Little things make big days.",
            "It’s going to be hard, but hard does not mean impossible.",
            "Don’t wait for opportunity. Create it.",
            "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
            "The harder you work for something, the greater you’ll feel when you achieve it.",
            "Dream bigger. Do bigger.",
            "Don’t stop when you’re tired. Stop when you’re done.",
            "Work hard in silence. Let success make the noise.",
            "Discipline is doing what needs to be done, even if you don’t want to do it.",
            "The key to success is to focus on goals, not obstacles.",
            "Stay positive. Work hard. Make it happen.",
            "Believe in yourself and all that you are.",
            "Go the extra mile. It’s never crowded.",
            "Hard work beats talent when talent doesn’t work hard.",
            "Don’t limit your challenges. Challenge your limits.",
            "You are stronger than you think.",
            "Every day is a second chance.",
            "It always seems impossible until it’s done.",
            "Doubt kills more dreams than failure ever will.",
            "You don’t have to be great to start, but you have to start to be great.",
            "Work until your idols become your rivals.",
            "If it doesn’t challenge you, it won’t change you.",
            "The only bad workout is the one that didn’t happen.",
            "Act as if what you do makes a difference. It does.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "You miss 100% of the shots you don’t take.",
            "A little progress each day adds up to big results.",
            "Don’t be afraid to give up the good to go for the great.",
            "Difficult roads often lead to beautiful destinations.",
            "Start where you are. Use what you have. Do what you can.",
            "Be stronger than your excuses.",
            "Make each day your masterpiece.",
            "Success is the sum of small efforts repeated day in and day out.",
            "Winners are not afraid of losing. But losers are.",
            "Success usually comes to those who are too busy to be looking for it.",
            "You are capable of amazing things.",
            "Fall seven times, stand up eight.",
            "Don’t count the days, make the days count.",
            "Strive for progress, not perfection.",
        ];

        return $phrases[rand(0, 50)];
    }
}
