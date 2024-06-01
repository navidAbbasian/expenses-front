import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Grid from '@mui/material/Grid';

export const SortableItem = ({ children, id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Grid
            item
            xs={6}
            sm={2}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            sx={{ cursor: 'grab', border: "0.5px solid gray", borderRadius: 2, padding: 1, '&:hover': { backgroundColor: 'lightgray' }, marginX: 1}}
        >
            {children}
        </Grid>
    );
};