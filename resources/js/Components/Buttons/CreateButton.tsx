import { Link } from '@inertiajs/react';

interface ViewButtonProps {
    url: string;
    name: string;
}

export default function ViewButton({ url, name } : ViewButtonProps) {
    return (
        <Link className='btn btn-primary btn-sm mb-2' href={url}>
            Create {name}
        </Link>
    )
}
