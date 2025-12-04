import { Link } from '@inertiajs/react';

interface EditButtonProps {
    url: string;
}

export default function EditButton({ url } : EditButtonProps) {
    return (
        <Link className='btn btn-success btn-sm mb-2' href={url}>
            Edit
        </Link>
    )
}
