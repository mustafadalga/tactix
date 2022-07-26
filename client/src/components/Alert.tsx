type Props = {
    type: string,
    message: string,
    className?: string
}

export default function Alert({type, message, className}: Props) {
    type typeClassList = {
        [key: string]: string
    }
    const classList: typeClassList = {
        success: 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
        info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
        warning: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800',
        error: 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800'
    }

    return (
        <div className={`px-4 py-2 text-sm rounded-lg ${classList[type]} ${className}`}>
            {message}
        </div>
    )
}