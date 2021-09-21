export interface TaskI {
    _id?: string;
    name: string;
    is_archived: boolean;
    list_id: string;
    priority: number;
    description?: string;
    end_date?: string;
}
