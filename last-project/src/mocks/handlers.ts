import { HttpResponse, http } from 'msw';

export const handlers = [
    http.get('/api/port-images', () => {
        return HttpResponse.json([
            'https://images.unsplash.com/photo-1480111410837-7d05ca5231d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8ODZ8fHNlYXxlbnwwfHx8fDE3MjU4Nzk4NjF8MA&ixlib=rb-4.0.3&q=80&w=400',
            'https://images.unsplash.com/photo-1544945582-3b466d874eac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8MTE3fHxzZWF8ZW58MHx8fHwxNzI1OTMyNzMxfDA&ixlib=rb-4.0.3&q=80&w=400',
            'https://images.unsplash.com/photo-1542029839090-36964323cd5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8NzZ8fHNlYXxlbnwwfHx8fDE3MjU4Nzk4NjB8MA&ixlib=rb-4.0.3&q=80&w=400',
            'https://images.unsplash.com/26/pelican.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8NzJ8fHNlYXxlbnwwfHx8fDE3MjU4Nzk4NjB8MA&ixlib=rb-4.0.3&q=80&w=400',
            'https://images.unsplash.com/photo-1495127280742-47f59274e2db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8MTA1fHxzZWF8ZW58MHx8fHwxNzI1OTMyNzMxfDA&ixlib=rb-4.0.3&q=80&w=400',
            'https://images.unsplash.com/photo-1519944613702-4f4ad2c7f9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNTgwfDB8MXxzZWFyY2h8MTA0fHxzZWF8ZW58MHx8fHwxNzI1OTMyNzMxfDA&ixlib=rb-4.0.3&q=80&w=400',
        ]);
    }),
];
