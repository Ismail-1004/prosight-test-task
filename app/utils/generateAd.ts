import { nanoid } from 'nanoid';
import type { Ad } from '~/types/ad';

const authors = ['Anna Smirnova', 'John Doe', 'Sophia Ivanova'];
const titles = [
    'Grocery Shopping Assistance',
    'Drive Me Home From Airport',
    'Weekly Meeting Reminder',
    'Design Logo for Startup',
];
const descriptions = [
    'Personal assistant for your grocery shopping. Quick and safe.',
    'Drive from airport to home quickly and safely.',
    'Prepare notes and reminders for weekly meetings.',
    'Create a professional logo for a new startup.',
];
const statuses: Ad['status'][] = ['active', 'pending', 'completed'];
const timesAgo = ['1 day ago', '2 hours ago', '3 days ago'];

export function generateFakeAd(): Ad {
    return {
        id: nanoid(),
        title: titles[Math.floor(Math.random() * titles.length)]!,
        description: descriptions[Math.floor(Math.random() * descriptions.length)]!,
        status: statuses[Math.floor(Math.random() * statuses.length)]!,
        author: authors[Math.floor(Math.random() * authors.length)]!,
        timeAgo: timesAgo[Math.floor(Math.random() * timesAgo.length)]!,
        comment: [],
    };
}