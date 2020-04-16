const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" },
        'task-2': { id: 'task-2', content: "https://images.pexels.com/photos/3818270/pexels-photo-3818270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
        'task-3': { id: 'task-3', content: "https://images.pexels.com/photos/3933480/pexels-photo-3933480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
        'task-4': { id: 'task-4', content: "https://images.pexels.com/photos/3375903/pexels-photo-3375903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to-do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
    },
    columnOrder: ['column-1'],
}

export default initialData;