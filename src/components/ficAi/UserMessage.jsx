export function UserMessage({ message }) {
    return (
        <div className="ml-auto max-w-[50%] p-3 m-2 bg-indigo-700 rounded-md">
            <p className="font-semibold wrap-break-word">
                {message}
            </p>
        </div>
    );
}