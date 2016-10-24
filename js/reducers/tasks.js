'use strict';

export type TaskList = {
    title: string;
    tasks: Array<Task>;
};

export Type Task = {
    title: string;
    location: Location;
    isDone: boolean;
    isRouted: boolean;
};

export Type Location = {
    lat: number;
    long: number;
    placeId: string;
};
