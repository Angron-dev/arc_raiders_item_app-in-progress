import { Link } from '@inertiajs/react';

interface CreateButton {
    url: string;
    name: string;
}

export default function CreateButton({ url, name } : CreateButton) {
    return (
        <Link className='btn btn-primary btn-sm mb-2' href={url}>
            Create {name}
        </Link>
    )
}
