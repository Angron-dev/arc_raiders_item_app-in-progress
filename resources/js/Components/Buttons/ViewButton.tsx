import { Link } from '@inertiajs/react';

interface ViewButtonProps {
    url: string;
}

export default function ViewButton({ url } : ViewButtonProps) {
    return (
        <Link className='btn btn-primary btn-sm mb-2' href={url}>
            View
        </Link>
    )
}
