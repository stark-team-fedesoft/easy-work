import { TaskI } from "./task";

export class ListI {
    _id?: string;
    name: string;
    is_archived: boolean;
    board_id: string;
    tasks?: TaskI[];
    loading? = false;
    priority?: number;
}
