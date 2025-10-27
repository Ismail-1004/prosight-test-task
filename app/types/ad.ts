export interface Comment {
    id: string,
    text: string,
    createdAt: string
}

export interface Ad {
    id: string,
    title: string,
    description: string,
    status: 'completed' | 'active' | 'pending',
    author: string,
    timeAgo: string,
    comment: Comment[]
}